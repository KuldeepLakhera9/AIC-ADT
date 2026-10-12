import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';
import { AuthenticatedUser, Permission, Role, UserStatus } from '../auth/auth.types.js';

describe('DashboardController', () => {
  let controller: DashboardController;
  let serviceMock: Partial<DashboardService>;

  const adminUser: AuthenticatedUser = {
    id: 'admin-123',
    email: 'admin@aic-adt.org',
    fullName: 'Admin User',
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    permissions: Object.values(Permission),
  };

  beforeEach(() => {
    serviceMock = {
      getOverview: vi.fn().mockResolvedValue({
        contentStatus: {
          draft: 0,
          inReview: 0,
          approved: 0,
          published: 0,
          archived: 0,
          total: 0,
        },
        pendingReviewCount: 0,
        recentlyUpdated: [],
        recentlyPublished: [],
        attentionItems: [],
        recentActivity: [],
      }),
    };

    controller = new DashboardController(serviceMock as DashboardService);
  });

  it('delegates getOverview to dashboard service with current user context', async () => {
    const result = await controller.getOverview(adminUser);

    expect(serviceMock.getOverview).toHaveBeenCalledWith(adminUser);
    expect(result.contentStatus.total).toBe(0);
    expect(result.pendingReviewCount).toBe(0);
  });
});
