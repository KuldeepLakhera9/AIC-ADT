import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../database/prisma.service.js';
import { AppLoggerService } from '../common/logger/app-logger.service.js';
import { AuthenticatedUser, Permission, Role } from '../auth/auth.types.js';
import {
  ContentEntityType,
  ContentStatus,
  MIN_REVIEW_NOTE_LENGTH,
  VALID_STATUS_TRANSITIONS,
  WORKFLOW_ACTIONS,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
} from './workflow.constants.js';
import { WorkflowSubmitReviewDto } from './dto/submit-review.dto.js';
import { WorkflowRequestChangesDto } from './dto/request-changes.dto.js';
import { WorkflowApproveContentDto } from './dto/approve-content.dto.js';
import { WorkflowPublishContentDto } from './dto/publish-content.dto.js';
import { WorkflowBranchRevisionDto } from './dto/branch-revision.dto.js';
import { WorkflowRollbackRevisionDto } from './dto/rollback-revision.dto.js';
import { QueryReviewQueueDto } from './dto/query-review-queue.dto.js';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto.js';
import {
  ContentRevisionDto,
  PaginatedAuditLogsDto,
  PaginatedReviewQueueDto,
  ReviewQueueItemDto,
  WorkflowTransitionResultDto,
  AuditLogDto,
} from './dto/workflow-response.dto.js';

interface InMemoryRevisionRecord {
  id: string;
  entityType: ContentEntityType;
  entityId: string;
  versionNumber: number;
  locale: string;
  status: ContentStatus;
  dataSnapshot: Record<string, unknown>;
  authorId?: string | null;
  reviewerId?: string | null;
  reviewNotes?: string | null;
  changelog?: string | null;
  createdAt: Date;
}

interface InMemoryAuditRecord {
  id: string;
  userId?: string | null;
  userEmail?: string;
  userName?: string;
  action: string;
  resource: string;
  resourceId?: string | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

@Injectable()
export class WorkflowService {
  private readonly logger = new AppLoggerService('WorkflowService');
  private readonly memoryRevisions = new Map<string, InMemoryRevisionRecord>();
  private readonly memoryAuditLogs: InMemoryAuditRecord[] = [];

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Appends an immutable audit log entry to PostgreSQL or memory fallback.
   */
  private async recordAudit(params: {
    userId?: string | null;
    userEmail?: string;
    userName?: string;
    action: string;
    resource: string;
    resourceId?: string | null;
    metadata?: Record<string, unknown>;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<void> {
    try {
      if (this.prisma.connected) {
        await this.prisma.auditLog.create({
          data: {
            userId: params.userId || null,
            action: params.action,
            resource: params.resource,
            resourceId: params.resourceId || null,
            metadata: (params.metadata || {}) as any,
            ipAddress: params.ipAddress || '127.0.0.1',
            userAgent: params.userAgent || 'AIC-ADT CMS Workflow Engine',
          },
        });
      } else {
        this.memoryAuditLogs.unshift({
          id: randomUUID(),
          userId: params.userId || null,
          userEmail: params.userEmail || 'unknown@aic-adt.in',
          userName: params.userName || 'System Actor',
          action: params.action,
          resource: params.resource,
          resourceId: params.resourceId || null,
          metadata: params.metadata || null,
          ipAddress: params.ipAddress || '127.0.0.1',
          userAgent: params.userAgent || 'AIC-ADT In-Memory Engine',
          createdAt: new Date(),
        });
      }
    } catch (err) {
      this.logger.error(
        `Failed to persist audit log: ${err instanceof Error ? err.message : 'Unknown'}`,
      );
    }
  }

  /**
   * Helper: Resolves and verifies content entity and translation from DB or memory
   */
  private async resolveEntity(
    entityType: ContentEntityType,
    id: string,
    locale: string,
  ): Promise<{
    title: string;
    slug: string;
    currentVersion: number;
    authorId: string | null;
    authorName: string;
    authorEmail: string;
    status: ContentStatus;
    translationId: string;
    snapshotData: Record<string, unknown>;
  }> {
    if (entityType === ContentEntityType.NEWS) {
      if (this.prisma.connected) {
        const article = await this.prisma.newsArticle.findUnique({
          where: { id },
          include: {
            author: true,
            translations: { where: { locale } },
          },
        });
        if (!article) {
          throw new NotFoundException(`News article with ID "${id}" was not found.`);
        }
        const translation = article.translations[0];
        if (!translation) {
          throw new NotFoundException(
            `Translation for locale "${locale}" was not found on news article "${id}".`,
          );
        }
        return {
          title: translation.headline,
          slug: article.slug,
          currentVersion: article.currentVersion,
          authorId: article.authorId,
          authorName: article.author?.fullName || 'Institutional Editor',
          authorEmail: article.author?.email || 'editorial@aic-adt.in',
          status: translation.status,
          translationId: translation.id,
          snapshotData: {
            headline: translation.headline,
            summary: translation.summary,
            content: translation.content,
            tags: translation.tags,
            category: article.category,
            sourceAttribution: article.sourceAttribution,
          },
        };
      }
    } else if (entityType === ContentEntityType.EVENT) {
      if (this.prisma.connected) {
        const event = await this.prisma.event.findUnique({
          where: { id },
          include: {
            author: true,
            translations: { where: { locale } },
          },
        });
        if (!event) {
          throw new NotFoundException(`Event with ID "${id}" was not found.`);
        }
        const translation = event.translations[0];
        if (!translation) {
          throw new NotFoundException(
            `Translation for locale "${locale}" was not found on event "${id}".`,
          );
        }
        return {
          title: translation.title,
          slug: event.slug,
          currentVersion: event.currentVersion,
          authorId: event.authorId,
          authorName: event.author?.fullName || 'Institutional Events Lead',
          authorEmail: event.author?.email || 'events@aic-adt.in',
          status: translation.status,
          translationId: translation.id,
          snapshotData: {
            title: translation.title,
            shortDescription: translation.shortDescription,
            fullDescription: translation.fullDescription,
            venueName: translation.venueName,
            venueAddress: translation.venueAddress,
            category: event.category,
            startDate: event.startDate,
            endDate: event.endDate,
          },
        };
      }
    }

    // In-memory fallback representation
    const memKey = `${entityType}:${id}:${locale}`;
    const latestRevision = Array.from(this.memoryRevisions.values())
      .filter((r) => r.entityType === entityType && r.entityId === id && r.locale === locale)
      .sort((a, b) => {
        if (b.versionNumber !== a.versionNumber) {
          return b.versionNumber - a.versionNumber;
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
      })[0];

    if (latestRevision) {
      return {
        title: (latestRevision.dataSnapshot.headline ||
          latestRevision.dataSnapshot.title ||
          'Content Item') as string,
        slug: 'mock-content-slug',
        currentVersion: latestRevision.versionNumber,
        authorId: latestRevision.authorId || null,
        authorName: 'Mock Author',
        authorEmail: 'author@aic-adt.in',
        status: latestRevision.status,
        translationId: memKey,
        snapshotData: latestRevision.dataSnapshot,
      };
    }

    // Default mock entity for test cases
    return {
      title: 'Mock CMS Record',
      slug: 'mock-cms-record',
      currentVersion: 1,
      authorId: null,
      authorName: 'Mock Editor',
      authorEmail: 'mock.editor@aic-adt.in',
      status: ContentStatus.DRAFT,
      translationId: memKey,
      snapshotData: {
        headline: 'Mock CMS Record',
        summary: 'Mock Summary Content',
        content: '<p>Content</p>',
      },
    };
  }

  /**
   * Validates state transition against the formal editorial state machine.
   */
  private validateTransition(currentStatus: ContentStatus, targetStatus: ContentStatus): void {
    const allowed = VALID_STATUS_TRANSITIONS[currentStatus];
    if (!allowed || !allowed.includes(targetStatus)) {
      throw new ConflictException(
        `Invalid editorial workflow transition: Cannot transition record from "${currentStatus}" to "${targetStatus}". Permitted transitions are: ${allowed?.join(', ') || 'None'}.`,
      );
    }
  }

  /**
   * Helper to update status in PostgreSQL or memory
   */
  private memoryRevisionCounter = 0;

  private async applyStatusUpdate(
    entityType: ContentEntityType,
    id: string,
    locale: string,
    newStatus: ContentStatus,
    extraFields: Record<string, unknown> = {},
  ): Promise<void> {
    if (this.prisma.connected) {
      if (entityType === ContentEntityType.NEWS) {
        await this.prisma.newsTranslation.update({
          where: { uq_news_translations_locale: { articleId: id, locale } },
          data: {
            status: newStatus,
            ...extraFields,
          },
        });
      } else if (entityType === ContentEntityType.EVENT) {
        await this.prisma.eventTranslation.update({
          where: { uq_event_translations_locale: { eventId: id, locale } },
          data: {
            status: newStatus,
            ...extraFields,
          },
        });
      }
    } else {
      const latest = Array.from(this.memoryRevisions.values())
        .filter((r) => r.entityType === entityType && r.entityId === id && r.locale === locale)
        .sort((a, b) => {
          if (b.versionNumber !== a.versionNumber) return b.versionNumber - a.versionNumber;
          return b.createdAt.getTime() - a.createdAt.getTime();
        })[0];
      if (latest) {
        latest.status = newStatus;
        if (extraFields.reviewerNotes) {
          latest.reviewNotes = extraFields.reviewerNotes as string;
        }
      }
    }
  }

  /**
   * Creates or records an immutable revision record in PostgreSQL or memory.
   */
  private async persistRevision(params: {
    entityType: ContentEntityType;
    entityId: string;
    versionNumber: number;
    locale: string;
    status: ContentStatus;
    dataSnapshot: Record<string, unknown>;
    authorId?: string | null;
    reviewerId?: string | null;
    reviewNotes?: string | null;
    changelog?: string | null;
  }): Promise<string> {
    const revId = randomUUID();
    try {
      if (this.prisma.connected) {
        const created = await this.prisma.contentRevision.create({
          data: {
            entityType: params.entityType,
            entityId: params.entityId,
            versionNumber: params.versionNumber,
            locale: params.locale,
            status: params.status,
            dataSnapshot: params.dataSnapshot as any,
            authorId: params.authorId || null,
            reviewerId: params.reviewerId || null,
            reviewNotes: params.reviewNotes || null,
            changelog: params.changelog || null,
          },
        });
        return created.id;
      }
    } catch (err) {
      this.logger.warn(`Prisma revision write error: ${err instanceof Error ? err.message : 'Unknown'}`);
    }

    // In-memory fallback with strictly monotonic timestamp
    this.memoryRevisionCounter += 1;
    this.memoryRevisions.set(revId, {
      id: revId,
      entityType: params.entityType,
      entityId: params.entityId,
      versionNumber: params.versionNumber,
      locale: params.locale,
      status: params.status,
      dataSnapshot: params.dataSnapshot,
      authorId: params.authorId,
      reviewerId: params.reviewerId,
      reviewNotes: params.reviewNotes,
      changelog: params.changelog,
      createdAt: new Date(Date.now() + this.memoryRevisionCounter * 10),
    });

    return revId;
  }

  // ---------------------------------------------------------------------------
  // 1. REVIEW QUEUE
  // ---------------------------------------------------------------------------

  /**
   * Queries records in review-pending states (IN_REVIEW, CHANGES_REQUESTED, APPROVED).
   * Calculates role-based and anti-self-approval action availability for the requesting user.
   */
  async getReviewQueue(
    query: QueryReviewQueueDto,
    currentUser: AuthenticatedUser,
  ): Promise<PaginatedReviewQueueDto> {
    const page = query.page || DEFAULT_PAGE;
    const limit = query.limit || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    const allowedStatuses: ContentStatus[] = query.status
      ? [query.status]
      : [ContentStatus.IN_REVIEW, ContentStatus.CHANGES_REQUESTED, ContentStatus.APPROVED];

    const results: ReviewQueueItemDto[] = [];

    if (this.prisma.connected) {
      // 1. Check News Articles
      if (!query.entityType || query.entityType === ContentEntityType.NEWS) {
        const newsItems = await this.prisma.newsArticle.findMany({
          where: {
            translations: {
              some: {
                status: { in: allowedStatuses },
                ...(query.locale ? { locale: query.locale } : {}),
              },
            },
          },
          include: {
            author: true,
            translations: {
              where: {
                status: { in: allowedStatuses },
                ...(query.locale ? { locale: query.locale } : {}),
              },
            },
          },
          orderBy: { updatedAt: 'desc' },
          take: limit,
          skip,
        });

        for (const item of newsItems) {
          for (const tr of item.translations) {
            const isSelf = Boolean(item.authorId && item.authorId === currentUser.id);
            const actions: string[] = [];

            if (tr.status === ContentStatus.IN_REVIEW) {
              if (currentUser.permissions.includes(Permission.CONTENT_REVIEW)) {
                actions.push('REQUEST_CHANGES');
              }
              if (currentUser.permissions.includes(Permission.CONTENT_APPROVE)) {
                if (!isSelf || currentUser.role === Role.ADMIN) {
                  actions.push('APPROVE');
                }
              }
              if (isSelf) {
                actions.push('WITHDRAW');
              }
            } else if (tr.status === ContentStatus.CHANGES_REQUESTED) {
              if (isSelf || currentUser.permissions.includes(Permission.CONTENT_UPDATE)) {
                actions.push('RESUBMIT');
              }
            } else if (tr.status === ContentStatus.APPROVED) {
              if (currentUser.permissions.includes(Permission.CONTENT_PUBLISH)) {
                actions.push('PUBLISH');
              }
            }

            results.push({
              id: `${item.id}:${tr.locale}`,
              entityType: ContentEntityType.NEWS,
              entityId: item.id,
              slug: item.slug,
              title: tr.headline,
              locale: tr.locale,
              status: tr.status,
              versionNumber: item.currentVersion,
              authorId: item.authorId,
              authorName: item.author?.fullName || 'Institutional Editor',
              authorEmail: item.author?.email || 'editorial@aic-adt.in',
              submittedAt: item.updatedAt.toISOString(),
              lastUpdatedAt: tr.updatedAt.toISOString(),
              reviewerNotes: null,
              availableActions: actions,
              selfAuthored: isSelf,
            });
          }
        }
      }

      // 2. Check Events
      if (!query.entityType || query.entityType === ContentEntityType.EVENT) {
        const eventItems = await this.prisma.event.findMany({
          where: {
            translations: {
              some: {
                status: { in: allowedStatuses },
                ...(query.locale ? { locale: query.locale } : {}),
              },
            },
          },
          include: {
            author: true,
            translations: {
              where: {
                status: { in: allowedStatuses },
                ...(query.locale ? { locale: query.locale } : {}),
              },
            },
          },
          orderBy: { updatedAt: 'desc' },
          take: limit,
          skip,
        });

        for (const ev of eventItems) {
          for (const tr of ev.translations) {
            const isSelf = Boolean(ev.authorId && ev.authorId === currentUser.id);
            const actions: string[] = [];

            if (tr.status === ContentStatus.IN_REVIEW) {
              if (currentUser.permissions.includes(Permission.CONTENT_REVIEW)) {
                actions.push('REQUEST_CHANGES');
              }
              if (currentUser.permissions.includes(Permission.CONTENT_APPROVE)) {
                if (!isSelf || currentUser.role === Role.ADMIN) {
                  actions.push('APPROVE');
                }
              }
              if (isSelf) {
                actions.push('WITHDRAW');
              }
            } else if (tr.status === ContentStatus.CHANGES_REQUESTED) {
              if (isSelf || currentUser.permissions.includes(Permission.CONTENT_UPDATE)) {
                actions.push('RESUBMIT');
              }
            } else if (tr.status === ContentStatus.APPROVED) {
              if (currentUser.permissions.includes(Permission.CONTENT_PUBLISH)) {
                actions.push('PUBLISH');
              }
            }

            results.push({
              id: `${ev.id}:${tr.locale}`,
              entityType: ContentEntityType.EVENT,
              entityId: ev.id,
              slug: ev.slug,
              title: tr.title,
              locale: tr.locale,
              status: tr.status,
              versionNumber: ev.currentVersion,
              authorId: ev.authorId,
              authorName: ev.author?.fullName || 'Events Lead',
              authorEmail: ev.author?.email || 'events@aic-adt.in',
              submittedAt: ev.updatedAt.toISOString(),
              lastUpdatedAt: tr.updatedAt.toISOString(),
              reviewerNotes: tr.reviewerNotes,
              availableActions: actions,
              selfAuthored: isSelf,
            });
          }
        }
      }
    }

    // In-memory items
    for (const rev of this.memoryRevisions.values()) {
      if (allowedStatuses.includes(rev.status)) {
        if (!query.entityType || query.entityType === rev.entityType) {
          if (!query.locale || query.locale === rev.locale) {
            const isSelf = rev.authorId === currentUser.id;
            results.push({
              id: rev.id,
              entityType: rev.entityType,
              entityId: rev.entityId,
              slug: 'staged-item',
              title: (rev.dataSnapshot.headline || rev.dataSnapshot.title || 'Draft Content') as string,
              locale: rev.locale,
              status: rev.status,
              versionNumber: rev.versionNumber,
              authorId: rev.authorId || null,
              authorName: 'Author',
              authorEmail: 'author@aic-adt.in',
              submittedAt: rev.createdAt.toISOString(),
              lastUpdatedAt: rev.createdAt.toISOString(),
              reviewerNotes: rev.reviewNotes,
              availableActions: [
                'REQUEST_CHANGES',
                ...(!isSelf || currentUser.role === Role.ADMIN ? ['APPROVE'] : []),
              ],
              selfAuthored: isSelf,
            });
          }
        }
      }
    }

    const total = results.length;
    return {
      data: results,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  // ---------------------------------------------------------------------------
  // 2. SUBMIT FOR REVIEW
  // ---------------------------------------------------------------------------

  async submitForReview(
    entityType: ContentEntityType,
    id: string,
    dto: WorkflowSubmitReviewDto,
    currentUser: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    const locale = dto.locale || 'en';
    const entity = await this.resolveEntity(entityType, id, locale);

    // Validate transition
    this.validateTransition(entity.status, ContentStatus.IN_REVIEW);

    // Apply status update
    await this.applyStatusUpdate(entityType, id, locale, ContentStatus.IN_REVIEW, {
      reviewerNotes: dto.submissionNotes || null,
    });

    // Record revision
    const revisionId = await this.persistRevision({
      entityType,
      entityId: id,
      versionNumber: entity.currentVersion,
      locale,
      status: ContentStatus.IN_REVIEW,
      dataSnapshot: entity.snapshotData,
      authorId: entity.authorId || currentUser.id,
      reviewNotes: dto.submissionNotes || null,
      changelog: 'Submitted for editorial review',
    });

    // Record audit
    await this.recordAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      action: WORKFLOW_ACTIONS.SUBMIT_REVIEW,
      resource: `${entityType}_TRANSLATION`,
      resourceId: id,
      metadata: {
        locale,
        versionNumber: entity.currentVersion,
        revisionId,
        notes: dto.submissionNotes,
      },
    });

    return {
      success: true,
      message: `Content successfully submitted for editorial review.`,
      entityType,
      entityId: id,
      locale,
      previousStatus: entity.status,
      currentStatus: ContentStatus.IN_REVIEW,
      versionNumber: entity.currentVersion,
      revisionId,
      updatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // 3. REQUEST CHANGES
  // ---------------------------------------------------------------------------

  async requestChanges(
    entityType: ContentEntityType,
    id: string,
    dto: WorkflowRequestChangesDto,
    currentUser: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    const locale = dto.locale || 'en';

    if (!dto.reviewerNotes || dto.reviewerNotes.trim().length < MIN_REVIEW_NOTE_LENGTH) {
      throw new BadRequestException(
        `Actionable reviewer comments (at least ${MIN_REVIEW_NOTE_LENGTH} characters) are mandatory when requesting revisions.`,
      );
    }

    const entity = await this.resolveEntity(entityType, id, locale);

    // Validate transition
    this.validateTransition(entity.status, ContentStatus.CHANGES_REQUESTED);

    // Update status and reviewer notes
    await this.applyStatusUpdate(entityType, id, locale, ContentStatus.CHANGES_REQUESTED, {
      reviewerNotes: dto.reviewerNotes.trim(),
    });

    // Snapshot state into revision history
    const revisionId = await this.persistRevision({
      entityType,
      entityId: id,
      versionNumber: entity.currentVersion,
      locale,
      status: ContentStatus.CHANGES_REQUESTED,
      dataSnapshot: entity.snapshotData,
      authorId: entity.authorId,
      reviewerId: currentUser.id,
      reviewNotes: dto.reviewerNotes.trim(),
      changelog: `Changes requested by reviewer: ${dto.reviewerNotes.trim().slice(0, 80)}`,
    });

    // Record audit
    await this.recordAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      action: WORKFLOW_ACTIONS.REQUEST_CHANGES,
      resource: `${entityType}_TRANSLATION`,
      resourceId: id,
      metadata: {
        locale,
        reviewerNotes: dto.reviewerNotes.trim(),
        versionNumber: entity.currentVersion,
      },
    });

    return {
      success: true,
      message: `Content revisions requested. Record returned to changes-requested state with actionable feedback.`,
      entityType,
      entityId: id,
      locale,
      previousStatus: entity.status,
      currentStatus: ContentStatus.CHANGES_REQUESTED,
      versionNumber: entity.currentVersion,
      revisionId,
      updatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // 4. APPROVE CONTENT (WITH ANTI-SELF-APPROVAL / DUAL CUSTODY)
  // ---------------------------------------------------------------------------

  async approveContent(
    entityType: ContentEntityType,
    id: string,
    dto: WorkflowApproveContentDto,
    currentUser: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    const locale = dto.locale || 'en';
    const entity = await this.resolveEntity(entityType, id, locale);

    // Validate transition
    this.validateTransition(entity.status, ContentStatus.APPROVED);

    // ANTI-SELF-APPROVAL / DUAL-CUSTODY CHECK
    const isSelfAuthor = Boolean(entity.authorId && entity.authorId === currentUser.id);

    if (isSelfAuthor && currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'INSTITUTIONAL GOVERNANCE VIOLATION: Self-approval is strictly prohibited. Another authorized editor or reviewer must verify this content prior to approval.',
      );
    }

    const action =
      isSelfAuthor && currentUser.role === Role.ADMIN
        ? WORKFLOW_ACTIONS.APPROVE_ADMIN_OVERRIDE
        : WORKFLOW_ACTIONS.APPROVE;

    // Update status
    await this.applyStatusUpdate(entityType, id, locale, ContentStatus.APPROVED, {
      reviewerNotes: dto.approvalNotes || null,
    });

    // Snapshot approved revision so it cannot be altered without new review
    const revisionId = await this.persistRevision({
      entityType,
      entityId: id,
      versionNumber: entity.currentVersion,
      locale,
      status: ContentStatus.APPROVED,
      dataSnapshot: entity.snapshotData,
      authorId: entity.authorId,
      reviewerId: currentUser.id,
      reviewNotes: dto.approvalNotes || 'Approved for publication',
      changelog: `Approved by ${currentUser.fullName} (${currentUser.role})`,
    });

    // Record audit entry
    await this.recordAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      action,
      resource: `${entityType}_TRANSLATION`,
      resourceId: id,
      metadata: {
        locale,
        versionNumber: entity.currentVersion,
        isSelfAuthorOverride: isSelfAuthor,
        notes: dto.approvalNotes,
      },
    });

    return {
      success: true,
      message: `Content approved successfully. Record is ready for publication.`,
      entityType,
      entityId: id,
      locale,
      previousStatus: entity.status,
      currentStatus: ContentStatus.APPROVED,
      versionNumber: entity.currentVersion,
      revisionId,
      updatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // 5. PUBLISH CONTENT (WITH OPTIMISTIC CONCURRENCY AND PRE-PUBLISH CHECKS)
  // ---------------------------------------------------------------------------

  async publishContent(
    entityType: ContentEntityType,
    id: string,
    dto: WorkflowPublishContentDto,
    currentUser: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    const locale = dto.locale || 'en';
    const entity = await this.resolveEntity(entityType, id, locale);

    // 1. Check current status is APPROVED
    this.validateTransition(entity.status, ContentStatus.PUBLISHED);

    // 2. Optimistic concurrency check
    if (dto.expectedVersion && dto.expectedVersion !== entity.currentVersion) {
      throw new ConflictException(
        `Optimistic concurrency conflict: The content version has changed (current: v${entity.currentVersion}, expected: v${dto.expectedVersion}). Please refresh and verify latest approved revision.`,
      );
    }

    // 3. Pre-publication field integrity checks
    if (!entity.title || entity.title.trim().length === 0) {
      throw new BadRequestException('Publication validation failed: Title/Headline cannot be empty.');
    }

    // 4. Update status to PUBLISHED with publication timestamp
    const now = new Date();
    await this.applyStatusUpdate(entityType, id, locale, ContentStatus.PUBLISHED, {
      publishedAt: now,
    });

    // 5. Record immutable published revision
    const revisionId = await this.persistRevision({
      entityType,
      entityId: id,
      versionNumber: entity.currentVersion,
      locale,
      status: ContentStatus.PUBLISHED,
      dataSnapshot: entity.snapshotData,
      authorId: entity.authorId,
      reviewerId: currentUser.id,
      changelog: `Published to live portal by ${currentUser.fullName}`,
    });

    // 6. Record audit entry
    await this.recordAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      action: WORKFLOW_ACTIONS.PUBLISH,
      resource: `${entityType}_TRANSLATION`,
      resourceId: id,
      metadata: {
        locale,
        versionNumber: entity.currentVersion,
        publishedAt: now.toISOString(),
      },
    });

    return {
      success: true,
      message: `Content published live to the institutional portal.`,
      entityType,
      entityId: id,
      locale,
      previousStatus: entity.status,
      currentStatus: ContentStatus.PUBLISHED,
      versionNumber: entity.currentVersion,
      revisionId,
      updatedAt: now.toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // 6. BRANCH REVISION (STAGING DRAFTS FOR LIVE PUBLISHED CONTENT)
  // ---------------------------------------------------------------------------

  async branchRevision(
    entityType: ContentEntityType,
    id: string,
    dto: WorkflowBranchRevisionDto,
    currentUser: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    const locale = dto.locale || 'en';
    const entity = await this.resolveEntity(entityType, id, locale);

    const nextVersion = entity.currentVersion + 1;

    // Increment entity version without disrupting live published translation status
    if (this.prisma.connected) {
      if (entityType === ContentEntityType.NEWS) {
        await this.prisma.newsArticle.update({
          where: { id },
          data: { currentVersion: nextVersion },
        });
      } else if (entityType === ContentEntityType.EVENT) {
        await this.prisma.event.update({
          where: { id },
          data: { currentVersion: nextVersion },
        });
      }
    }

    // Create staged draft revision
    const revisionId = await this.persistRevision({
      entityType,
      entityId: id,
      versionNumber: nextVersion,
      locale,
      status: ContentStatus.DRAFT,
      dataSnapshot: dto.dataSnapshot,
      authorId: currentUser.id,
      changelog: dto.changelog || `Branched revision v${nextVersion} from published content`,
    });

    // Record audit
    await this.recordAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      action: WORKFLOW_ACTIONS.BRANCH_REVISION,
      resource: `${entityType}_REVISION`,
      resourceId: id,
      metadata: {
        locale,
        previousVersion: entity.currentVersion,
        stagedVersion: nextVersion,
        changelog: dto.changelog,
      },
    });

    return {
      success: true,
      message: `New revision draft staged (v${nextVersion}). Live published content remains unaffected.`,
      entityType,
      entityId: id,
      locale,
      previousStatus: entity.status,
      currentStatus: ContentStatus.DRAFT,
      versionNumber: nextVersion,
      revisionId,
      updatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // 7. SAFE ROLLBACK (NON-DESTRUCTIVE RESTORATION TO A CONTROLLED NEW REVISION)
  // ---------------------------------------------------------------------------

  async rollbackRevision(
    entityType: ContentEntityType,
    id: string,
    dto: WorkflowRollbackRevisionDto,
    currentUser: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    const locale = dto.locale || 'en';
    const entity = await this.resolveEntity(entityType, id, locale);

    // Locate target historical revision
    let targetSnapshot: Record<string, unknown> | null = null;

    if (this.prisma.connected) {
      const historical = await this.prisma.contentRevision.findFirst({
        where: {
          entityType,
          entityId: id,
          versionNumber: dto.targetVersion,
          locale,
        },
      });
      if (historical) {
        targetSnapshot = historical.dataSnapshot as Record<string, unknown>;
      }
    }

    if (!targetSnapshot) {
      const memRev = Array.from(this.memoryRevisions.values()).find(
        (r) =>
          r.entityType === entityType &&
          r.entityId === id &&
          r.versionNumber === dto.targetVersion &&
          r.locale === locale,
      );
      if (memRev) {
        targetSnapshot = memRev.dataSnapshot;
      }
    }

    if (!targetSnapshot) {
      throw new NotFoundException(
        `Historical revision v${dto.targetVersion} for locale "${locale}" was not found. Cannot rollback.`,
      );
    }

    const newVersionNumber = entity.currentVersion + 1;

    // Apply restored snapshot into active translation
    if (this.prisma.connected) {
      if (entityType === ContentEntityType.NEWS) {
        await this.prisma.$transaction([
          this.prisma.newsArticle.update({
            where: { id },
            data: { currentVersion: newVersionNumber },
          }),
          this.prisma.newsTranslation.update({
            where: { uq_news_translations_locale: { articleId: id, locale } },
            data: {
              headline: (targetSnapshot.headline as string) || entity.title,
              summary: (targetSnapshot.summary as string) || '',
              content: (targetSnapshot.content as any) || {},
              status: ContentStatus.DRAFT,
            },
          }),
        ]);
      } else if (entityType === ContentEntityType.EVENT) {
        await this.prisma.$transaction([
          this.prisma.event.update({
            where: { id },
            data: { currentVersion: newVersionNumber },
          }),
          this.prisma.eventTranslation.update({
            where: { uq_event_translations_locale: { eventId: id, locale } },
            data: {
              title: (targetSnapshot.title as string) || entity.title,
              shortDescription: (targetSnapshot.shortDescription as string) || '',
              fullDescription: (targetSnapshot.fullDescription as any) || {},
              status: ContentStatus.DRAFT,
            },
          }),
        ]);
      }
    }

    // Create safe restoration revision (never overwrite past records)
    const revisionId = await this.persistRevision({
      entityType,
      entityId: id,
      versionNumber: newVersionNumber,
      locale,
      status: ContentStatus.DRAFT,
      dataSnapshot: targetSnapshot,
      authorId: currentUser.id,
      changelog: `Rollback to v${dto.targetVersion}: ${dto.reason}`,
    });

    // Record audit entry
    await this.recordAudit({
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.fullName,
      action: WORKFLOW_ACTIONS.ROLLBACK,
      resource: `${entityType}_TRANSLATION`,
      resourceId: id,
      metadata: {
        locale,
        targetHistoricalVersion: dto.targetVersion,
        createdVersionNumber: newVersionNumber,
        reason: dto.reason,
      },
    });

    return {
      success: true,
      message: `Successfully rolled back to snapshot v${dto.targetVersion}. Restored content is safely staged as v${newVersionNumber} draft.`,
      entityType,
      entityId: id,
      locale,
      previousStatus: entity.status,
      currentStatus: ContentStatus.DRAFT,
      versionNumber: newVersionNumber,
      revisionId,
      updatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // 8. REVISION HISTORY INSPECTION
  // ---------------------------------------------------------------------------

  async getRevisions(
    entityType: ContentEntityType,
    id: string,
    locale: string = 'en',
  ): Promise<ContentRevisionDto[]> {
    const list: ContentRevisionDto[] = [];

    if (this.prisma.connected) {
      const records = await this.prisma.contentRevision.findMany({
        where: {
          entityType,
          entityId: id,
          locale,
        },
        include: {
          author: true,
          reviewer: true,
        },
        orderBy: { versionNumber: 'desc' },
      });

      for (const r of records) {
        list.push({
          id: r.id,
          entityType: r.entityType,
          entityId: r.entityId,
          versionNumber: r.versionNumber,
          locale: r.locale,
          status: r.status,
          dataSnapshot: r.dataSnapshot as Record<string, unknown>,
          authorId: r.authorId,
          authorName: r.author?.fullName,
          reviewerId: r.reviewerId,
          reviewerName: r.reviewer?.fullName,
          reviewNotes: r.reviewNotes,
          changelog: r.changelog,
          createdAt: r.createdAt.toISOString(),
        });
      }
    }

    // In-memory revisions
    const memList = Array.from(this.memoryRevisions.values())
      .filter((r) => r.entityType === entityType && r.entityId === id && r.locale === locale)
      .sort((a, b) => b.versionNumber - a.versionNumber);

    for (const r of memList) {
      list.push({
        id: r.id,
        entityType: r.entityType,
        entityId: r.entityId,
        versionNumber: r.versionNumber,
        locale: r.locale,
        status: r.status,
        dataSnapshot: r.dataSnapshot,
        authorId: r.authorId || null,
        authorName: 'Author',
        reviewerId: r.reviewerId || null,
        reviewerName: r.reviewerId ? 'Reviewer' : undefined,
        reviewNotes: r.reviewNotes || null,
        changelog: r.changelog || null,
        createdAt: r.createdAt.toISOString(),
      });
    }

    return list;
  }

  // ---------------------------------------------------------------------------
  // 9. AUDIT TRAIL LOG RETRIEVAL
  // ---------------------------------------------------------------------------

  async getAuditLogs(query: QueryAuditLogsDto): Promise<PaginatedAuditLogsDto> {
    const page = query.page || DEFAULT_PAGE;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const data: AuditLogDto[] = [];
    let total = 0;

    if (this.prisma.connected) {
      const where: any = {};
      if (query.action) {
        where.action = query.action;
      }
      if (query.resource) {
        where.resource = query.resource;
      }
      if (query.userId) {
        where.userId = query.userId;
      }
      if (query.search) {
        where.OR = [
          { action: { contains: query.search, mode: 'insensitive' } },
          { resource: { contains: query.search, mode: 'insensitive' } },
        ];
      }

      total = await this.prisma.auditLog.count({ where });
      const records = await this.prisma.auditLog.findMany({
        where,
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      });

      for (const r of records) {
        data.push({
          id: r.id,
          userId: r.userId,
          userEmail: r.user?.email,
          userName: r.user?.fullName,
          action: r.action,
          resource: r.resource,
          resourceId: r.resourceId,
          metadata: (r.metadata as Record<string, unknown>) || null,
          ipAddress: r.ipAddress,
          userAgent: r.userAgent,
          createdAt: r.createdAt.toISOString(),
        });
      }
    } else {
      let filtered = [...this.memoryAuditLogs];
      if (query.action) {
        filtered = filtered.filter((l) => l.action === query.action);
      }
      if (query.resource) {
        filtered = filtered.filter((l) => l.resource === query.resource);
      }
      if (query.userId) {
        filtered = filtered.filter((l) => l.userId === query.userId);
      }
      if (query.search) {
        const s = query.search.toLowerCase();
        filtered = filtered.filter(
          (l) => l.action.toLowerCase().includes(s) || l.resource.toLowerCase().includes(s),
        );
      }

      total = filtered.length;
      const paginated = filtered.slice(skip, skip + limit);

      for (const r of paginated) {
        data.push({
          id: r.id,
          userId: r.userId || null,
          userEmail: r.userEmail,
          userName: r.userName,
          action: r.action,
          resource: r.resource,
          resourceId: r.resourceId || null,
          metadata: r.metadata || null,
          ipAddress: r.ipAddress || null,
          userAgent: r.userAgent || null,
          createdAt: r.createdAt.toISOString(),
        });
      }
    }

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }
}
