import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WorkflowController } from './workflow.controller.js';
import { WorkflowService } from './workflow.service.js';
import { AuthenticatedUser, Permission, Role } from '../auth/auth.types.js';
import { ContentEntityType, ContentStatus } from './workflow.constants.js';

describe('WorkflowController', () => {
  let controller: WorkflowController;
  let serviceMock: Partial<WorkflowService>;

  const mockUser: AuthenticatedUser = {
    id: 'user-uuid-1',
    email: 'approver@aic-adt.in',
    fullName: 'Editorial Approver',
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

  beforeEach(() => {
    serviceMock = {
      getReviewQueue: vi.fn().mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
      submitForReview: vi.fn().mockResolvedValue({
        success: true,
        message: 'Submitted',
        entityType: ContentEntityType.NEWS,
        entityId: 'id-1',
        locale: 'en',
        previousStatus: ContentStatus.DRAFT,
        currentStatus: ContentStatus.IN_REVIEW,
        versionNumber: 1,
        updatedAt: new Date().toISOString(),
      }),
      requestChanges: vi.fn().mockResolvedValue({
        success: true,
        message: 'Changes requested',
        entityType: ContentEntityType.NEWS,
        entityId: 'id-1',
        locale: 'en',
        previousStatus: ContentStatus.IN_REVIEW,
        currentStatus: ContentStatus.CHANGES_REQUESTED,
        versionNumber: 1,
        updatedAt: new Date().toISOString(),
      }),
      approveContent: vi.fn().mockResolvedValue({
        success: true,
        message: 'Approved',
        entityType: ContentEntityType.NEWS,
        entityId: 'id-1',
        locale: 'en',
        previousStatus: ContentStatus.IN_REVIEW,
        currentStatus: ContentStatus.APPROVED,
        versionNumber: 1,
        updatedAt: new Date().toISOString(),
      }),
      publishContent: vi.fn().mockResolvedValue({
        success: true,
        message: 'Published',
        entityType: ContentEntityType.NEWS,
        entityId: 'id-1',
        locale: 'en',
        previousStatus: ContentStatus.APPROVED,
        currentStatus: ContentStatus.PUBLISHED,
        versionNumber: 1,
        updatedAt: new Date().toISOString(),
      }),
      branchRevision: vi.fn().mockResolvedValue({
        success: true,
        message: 'Branched',
        entityType: ContentEntityType.NEWS,
        entityId: 'id-1',
        locale: 'en',
        previousStatus: ContentStatus.PUBLISHED,
        currentStatus: ContentStatus.DRAFT,
        versionNumber: 2,
        updatedAt: new Date().toISOString(),
      }),
      rollbackRevision: vi.fn().mockResolvedValue({
        success: true,
        message: 'Rolled back',
        entityType: ContentEntityType.NEWS,
        entityId: 'id-1',
        locale: 'en',
        previousStatus: ContentStatus.DRAFT,
        currentStatus: ContentStatus.DRAFT,
        versionNumber: 3,
        updatedAt: new Date().toISOString(),
      }),
      getRevisions: vi.fn().mockResolvedValue([]),
      getAuditLogs: vi.fn().mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      }),
    };

    controller = new WorkflowController(serviceMock as WorkflowService);
  });

  it('delegates getReviewQueue call to service', async () => {
    const result = await controller.getReviewQueue({}, mockUser);
    expect(serviceMock.getReviewQueue).toHaveBeenCalledWith({}, mockUser);
    expect(result.data).toEqual([]);
  });

  it('delegates approveContent call to service', async () => {
    const result = await controller.approveContent(
      ContentEntityType.NEWS,
      'news-1',
      { locale: 'en', approvalNotes: 'Signed off' },
      mockUser,
    );
    expect(serviceMock.approveContent).toHaveBeenCalledWith(
      ContentEntityType.NEWS,
      'news-1',
      { locale: 'en', approvalNotes: 'Signed off' },
      mockUser,
    );
    expect(result.currentStatus).toBe(ContentStatus.APPROVED);
  });

  it('delegates rollbackRevision call to service', async () => {
    const result = await controller.rollbackRevision(
      ContentEntityType.NEWS,
      'news-1',
      { locale: 'en', targetVersion: 1, reason: 'Restoring verified official version' },
      mockUser,
    );
    expect(serviceMock.rollbackRevision).toHaveBeenCalled();
    expect(result.versionNumber).toBe(3);
  });
});
