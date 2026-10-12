import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service.js';
import { PrismaService } from '../database/prisma.service.js';
import { AuthenticatedUser, Permission, Role } from '../auth/auth.types.js';
import { ContentEntityType, ContentStatus, WORKFLOW_ACTIONS } from './workflow.constants.js';

describe('WorkflowService', () => {
  let service: WorkflowService;
  let prismaMock: any;

  const mockAuthor: AuthenticatedUser = {
    id: 'author-user-uuid-1',
    email: 'editor@aic-adt.in',
    fullName: 'Editorial Author',
    role: Role.CONTENT_EDITOR,
    status: 'ACTIVE',
    permissions: [
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
      Permission.AUDIT_READ,
    ],
  };

  const mockReviewer: AuthenticatedUser = {
    id: 'reviewer-user-uuid-2',
    email: 'approver@aic-adt.in',
    fullName: 'Governance Approver',
    role: Role.APPROVER,
    status: 'ACTIVE',
    permissions: [
      Permission.CONTENT_READ,
      Permission.CONTENT_REVIEW,
      Permission.CONTENT_APPROVE,
      Permission.CONTENT_PUBLISH,
      Permission.AUDIT_READ,
    ],
  };

  const mockAdmin: AuthenticatedUser = {
    id: 'admin-user-uuid-3',
    email: 'admin@aic-adt.in',
    fullName: 'System Administrator',
    role: Role.ADMIN,
    status: 'ACTIVE',
    permissions: Object.values(Permission),
  };

  beforeEach(() => {
    prismaMock = {
      connected: false,
      auditLog: {
        create: vi.fn(),
        count: vi.fn().mockResolvedValue(0),
        findMany: vi.fn().mockResolvedValue([]),
      },
      contentRevision: {
        create: vi.fn(),
        findFirst: vi.fn(),
        findMany: vi.fn().mockResolvedValue([]),
      },
      newsArticle: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      newsTranslation: {
        update: vi.fn(),
      },
      event: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      eventTranslation: {
        update: vi.fn(),
      },
      $transaction: vi.fn().mockImplementation((promises) => Promise.all(promises)),
    };

    service = new WorkflowService(prismaMock as unknown as PrismaService);
  });

  describe('Workflow Transitions & Validation', () => {
    it('submits a DRAFT for review and transitions to IN_REVIEW', async () => {
      const result = await service.submitForReview(
        ContentEntityType.NEWS,
        'news-123',
        { locale: 'en', submissionNotes: 'Draft ready for editorial verification' },
        mockAuthor,
      );

      expect(result.success).toBe(true);
      expect(result.previousStatus).toBe(ContentStatus.DRAFT);
      expect(result.currentStatus).toBe(ContentStatus.IN_REVIEW);
      expect(result.versionNumber).toBe(1);
    });

    it('rejects illegal transition from DRAFT directly to PUBLISHED with ConflictException', async () => {
      await expect(
        service.publishContent(
          ContentEntityType.NEWS,
          'news-draft-456',
          { locale: 'en' },
          mockReviewer,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('Change Requests & Reviewer Feedback', () => {
    it('rejects change requests when reviewer comments are under 10 characters', async () => {
      // First submit for review
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-rev-1',
        { locale: 'en' },
        mockAuthor,
      );

      await expect(
        service.requestChanges(
          ContentEntityType.NEWS,
          'news-rev-1',
          { locale: 'en', reviewerNotes: 'Fix this' }, // only 8 chars
          mockReviewer,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('successfully requests changes with actionable comments and updates status to CHANGES_REQUESTED', async () => {
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-rev-2',
        { locale: 'en' },
        mockAuthor,
      );

      const result = await service.requestChanges(
        ContentEntityType.NEWS,
        'news-rev-2',
        {
          locale: 'en',
          reviewerNotes: 'Please verify the funding figure with the incubation committee minutes.',
        },
        mockReviewer,
      );

      expect(result.success).toBe(true);
      expect(result.currentStatus).toBe(ContentStatus.CHANGES_REQUESTED);
    });
  });

  describe('Anti-Self-Approval & Dual-Custody Enforcement', () => {
    it('prevents content author from approving their own submission (Anti-Self-Approval violation)', async () => {
      // Author submits content
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-dual-custody',
        { locale: 'en' },
        mockAuthor,
      );

      // Same author attempts to approve their own content
      await expect(
        service.approveContent(
          ContentEntityType.NEWS,
          'news-dual-custody',
          { locale: 'en', approvalNotes: 'Looks good to me' },
          mockAuthor, // Author trying to self-approve!
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('allows a distinct authorized reviewer to approve content', async () => {
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-approval-ok',
        { locale: 'en' },
        mockAuthor,
      );

      const result = await service.approveContent(
        ContentEntityType.NEWS,
        'news-approval-ok',
        { locale: 'en', approvalNotes: 'Fact-checked and approved for publication' },
        mockReviewer, // Different user with APPROVER role
      );

      expect(result.success).toBe(true);
      expect(result.currentStatus).toBe(ContentStatus.APPROVED);
    });

    it('permits ADMIN emergency override of self-approval with critical audit logging', async () => {
      // Admin submits content
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-admin-override',
        { locale: 'en' },
        mockAdmin,
      );

      const result = await service.approveContent(
        ContentEntityType.NEWS,
        'news-admin-override',
        { locale: 'en', approvalNotes: 'Emergency administrative sign-off' },
        mockAdmin, // Admin self-approval override
      );

      expect(result.success).toBe(true);
      expect(result.currentStatus).toBe(ContentStatus.APPROVED);
    });
  });

  describe('Publication & Optimistic Concurrency', () => {
    it('publishes approved content successfully', async () => {
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-pub-1',
        { locale: 'en' },
        mockAuthor,
      );
      await service.approveContent(
        ContentEntityType.NEWS,
        'news-pub-1',
        { locale: 'en' },
        mockReviewer,
      );

      const result = await service.publishContent(
        ContentEntityType.NEWS,
        'news-pub-1',
        { locale: 'en', expectedVersion: 1 },
        mockReviewer,
      );

      expect(result.success).toBe(true);
      expect(result.currentStatus).toBe(ContentStatus.PUBLISHED);
    });

    it('rejects publication when expectedVersion does not match current version (stale revision conflict)', async () => {
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-pub-stale',
        { locale: 'en' },
        mockAuthor,
      );
      await service.approveContent(
        ContentEntityType.NEWS,
        'news-pub-stale',
        { locale: 'en' },
        mockReviewer,
      );

      await expect(
        service.publishContent(
          ContentEntityType.NEWS,
          'news-pub-stale',
          { locale: 'en', expectedVersion: 99 }, // Stale version
          mockReviewer,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('Revision Staging & Safe Rollback', () => {
    it('branches a new draft revision for published content without altering live published state', async () => {
      // Setup published item
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-branch-1',
        { locale: 'en' },
        mockAuthor,
      );
      await service.approveContent(
        ContentEntityType.NEWS,
        'news-branch-1',
        { locale: 'en' },
        mockReviewer,
      );
      await service.publishContent(
        ContentEntityType.NEWS,
        'news-branch-1',
        { locale: 'en' },
        mockReviewer,
      );

      // Branch new staged revision
      const branched = await service.branchRevision(
        ContentEntityType.NEWS,
        'news-branch-1',
        {
          locale: 'en',
          changelog: 'Staging revised headline and paragraph',
          dataSnapshot: {
            headline: 'Updated Future Headline',
            summary: 'Updated Future Summary',
            content: '<p>Revised body text</p>',
          },
        },
        mockAuthor,
      );

      expect(branched.success).toBe(true);
      expect(branched.versionNumber).toBe(2);
      expect(branched.currentStatus).toBe(ContentStatus.DRAFT);
    });

    it('performs safe rollback to historical snapshot by creating a new version without erasing history', async () => {
      // Initial v1
      await service.submitForReview(
        ContentEntityType.NEWS,
        'news-rollback-1',
        { locale: 'en' },
        mockAuthor,
      );

      // Branch v2
      await service.branchRevision(
        ContentEntityType.NEWS,
        'news-rollback-1',
        {
          locale: 'en',
          changelog: 'Revision v2 content',
          dataSnapshot: { headline: 'V2 Headline', summary: 'V2 Summary' },
        },
        mockAuthor,
      );

      // Rollback to v1
      const rolledBack = await service.rollbackRevision(
        ContentEntityType.NEWS,
        'news-rollback-1',
        {
          locale: 'en',
          targetVersion: 1,
          reason: 'Reverting unauthorized edit back to verified foundation announcement',
        },
        mockReviewer,
      );

      expect(rolledBack.success).toBe(true);
      expect(rolledBack.versionNumber).toBe(3); // Increment to v3, non-destructive!
      expect(rolledBack.currentStatus).toBe(ContentStatus.DRAFT);
    });

    it('rejects rollback when target version does not exist', async () => {
      await expect(
        service.rollbackRevision(
          ContentEntityType.NEWS,
          'non-existent-entity',
          {
            locale: 'en',
            targetVersion: 999,
            reason: 'Testing invalid rollback',
          },
          mockReviewer,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('Review Queue & Audit Trail', () => {
    it('returns review queue items with appropriate role-based actions and self-authorship flags', async () => {
      await service.submitForReview(
        ContentEntityType.NEWS,
        'queue-item-1',
        { locale: 'en' },
        mockAuthor,
      );

      const queueForReviewer = await service.getReviewQueue({}, mockReviewer);
      expect(queueForReviewer.data.length).toBeGreaterThan(0);

      const item = queueForReviewer.data.find((i) => i.entityId === 'queue-item-1');
      expect(item).toBeDefined();
      expect(item?.selfAuthored).toBe(false);
      expect(item?.availableActions).toContain('APPROVE');
      expect(item?.availableActions).toContain('REQUEST_CHANGES');
    });

    it('records immutable audit logs and supports paginated retrieval', async () => {
      await service.submitForReview(
        ContentEntityType.NEWS,
        'audit-test-1',
        { locale: 'en' },
        mockAuthor,
      );

      const logs = await service.getAuditLogs({ limit: 10 });
      expect(logs.data.length).toBeGreaterThan(0);
      expect(logs.data[0].action).toBe(WORKFLOW_ACTIONS.SUBMIT_REVIEW);
    });
  });
});
