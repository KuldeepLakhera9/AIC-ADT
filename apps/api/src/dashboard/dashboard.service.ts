import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { AppLoggerService } from '../common/logger/app-logger.service.js';
import { AuthenticatedUser, Permission } from '../auth/auth.types.js';
import { AuthUserDto } from '../auth/dto/auth-user.dto.js';
import {
  DashboardOverviewResponse,
  RecentAuditActivity,
} from './dashboard.types.js';

@Injectable()
export class DashboardService {
  private readonly logger = new AppLoggerService('DashboardService');

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves an aggregated, role-filtered dashboard overview.
   * Real database counts are queried; when tables have no records, real 0s are returned.
   * Private audit trails are only returned to roles possessing `audit.read` permission.
   */
  async getOverview(
    user: AuthUserDto | AuthenticatedUser,
  ): Promise<DashboardOverviewResponse> {
    const hasAuditRead = user.permissions.includes(Permission.AUDIT_READ);
    let recentActivity: RecentAuditActivity[] = [];

    if (hasAuditRead) {
      try {
        if (this.prisma.connected) {
          const logs = await this.prisma.auditLog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: {
                  email: true,
                  fullName: true,
                },
              },
            },
          });

          recentActivity = logs.map((log) => ({
            id: log.id,
            action: log.action,
            resource: log.resource,
            userEmail: log.user?.email ?? 'system@aic-adt.org',
            userName: log.user?.fullName ?? 'System Automated Service',
            timestamp: log.createdAt.toISOString(),
          }));
        }
      } catch (err) {
        this.logger.warn(
          `Unable to retrieve audit logs for dashboard overview: ${err instanceof Error ? err.message : 'Unknown error'}`,
          'DashboardService',
        );
      }
    }

    // Authentic content summary queried from PostgreSQL
    let draftCount = 0;
    let inReviewCount = 0;
    let approvedCount = 0;
    let publishedCount = 0;
    let archivedCount = 0;
    let recentlyUpdated: DashboardOverviewResponse['recentlyUpdated'] = [];
    let recentlyPublished: DashboardOverviewResponse['recentlyPublished'] = [];

    if (this.prisma.connected) {
      try {
        const [
          newsDrafts,
          eventDrafts,
          newsInReview,
          eventInReview,
          newsApproved,
          eventApproved,
          newsPublished,
          eventPublished,
          newsArchived,
          eventArchived,
        ] = await Promise.all([
          this.prisma.newsTranslation.count({ where: { status: 'DRAFT' } }),
          this.prisma.eventTranslation.count({ where: { status: 'DRAFT' } }),
          this.prisma.newsTranslation.count({ where: { status: 'IN_REVIEW' } }),
          this.prisma.eventTranslation.count({ where: { status: 'IN_REVIEW' } }),
          this.prisma.newsTranslation.count({ where: { status: 'APPROVED' } }),
          this.prisma.eventTranslation.count({ where: { status: 'APPROVED' } }),
          this.prisma.newsTranslation.count({ where: { status: 'PUBLISHED' } }),
          this.prisma.eventTranslation.count({ where: { status: 'PUBLISHED' } }),
          this.prisma.newsTranslation.count({ where: { status: 'ARCHIVED' } }),
          this.prisma.eventTranslation.count({ where: { status: 'ARCHIVED' } }),
        ]);
        draftCount = newsDrafts + eventDrafts;
        inReviewCount = newsInReview + eventInReview;
        approvedCount = newsApproved + eventApproved;
        publishedCount = newsPublished + eventPublished;
        archivedCount = newsArchived + eventArchived;

        const recentArticles = await this.prisma.newsArticle.findMany({
          take: 5,
          orderBy: { updatedAt: 'desc' },
          include: {
            translations: true,
            author: { select: { fullName: true } },
          },
        });

        recentlyUpdated = recentArticles.map((a) => {
          const tr = a.translations[0];
          return {
            id: a.id,
            title: tr ? tr.headline : a.slug,
            contentType: 'NEWS',
            status: tr ? tr.status : 'DRAFT',
            updatedAt: a.updatedAt.toISOString(),
            updatedBy: a.author?.fullName,
          };
        });

        const recentPubs = await this.prisma.newsArticle.findMany({
          where: {
            translations: { some: { status: 'PUBLISHED' } },
          },
          take: 5,
          orderBy: { publishDate: 'desc' },
          include: { translations: true },
        });

        recentlyPublished = recentPubs.map((a) => {
          const tr = a.translations.find((t) => t.status === 'PUBLISHED') || a.translations[0];
          return {
            id: a.id,
            title: tr ? tr.headline : a.slug,
            contentType: 'NEWS',
            publishedAt: (tr?.publishedAt || a.publishDate).toISOString(),
            slug: a.slug,
          };
        });
      } catch (err) {
        this.logger.warn(
          `Unable to query content records for dashboard metrics: ${err instanceof Error ? err.message : 'Unknown'}`,
          'DashboardService',
        );
      }
    }

    const totalCount = draftCount + inReviewCount + approvedCount + publishedCount + archivedCount;

    return {
      contentStatus: {
        draft: draftCount,
        inReview: inReviewCount,
        approved: approvedCount,
        published: publishedCount,
        archived: archivedCount,
        total: totalCount,
      },
      pendingReviewCount: inReviewCount,
      recentlyUpdated,
      recentlyPublished,
      attentionItems: [],
      recentActivity,
    };
  }

  /**
   * Records an authoritative administrative action into the append-only audit trail.
   */
  async recordAudit(
    userId: string,
    action: string,
    resource: string,
    resourceId?: string,
    ipAddress?: string,
    userAgent?: string,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    try {
      if (this.prisma.connected) {
        await this.prisma.auditLog.create({
          data: {
            userId,
            action,
            resource,
            resourceId,
            ipAddress,
            userAgent,
            metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
          },
        });
      }
    } catch (err) {
      this.logger.warn(
        `Failed to persist audit log record: ${err instanceof Error ? err.message : 'Unknown error'}`,
        'DashboardService',
      );
    }
  }
}
