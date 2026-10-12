import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardService } from './dashboard.service.js';
import { PrismaService } from '../database/prisma.service.js';
import { AuthenticatedUser, Permission, Role, UserStatus } from '../auth/auth.types.js';

describe('DashboardService', () => {
  let service: DashboardService;
  let prismaMock: Partial<PrismaService>;

  const adminUser: AuthenticatedUser = {
    id: 'admin-123',
    email: 'admin@aic-adt.org',
    fullName: 'Admin User',
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    permissions: Object.values(Permission),
  };

  const editorUser: AuthenticatedUser = {
    id: 'editor-123',
    email: 'editor@aic-adt.org',
    fullName: 'Editor User',
    role: Role.CONTENT_EDITOR,
    status: UserStatus.ACTIVE,
    permissions: [
      Permission.DASHBOARD_READ,
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
      Permission.MEDIA_READ,
      Permission.MEDIA_UPLOAD,
    ],
  };

  beforeEach(() => {
    prismaMock = {
      connected: true,
      auditLog: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: 'audit-1',
            action: 'USER_LOGIN',
            resource: 'SESSION',
            createdAt: new Date('2026-10-12T10:00:00Z'),
            user: {
              email: 'admin@aic-adt.org',
              fullName: 'Admin User',
            },
          },
        ]),
        create: vi.fn().mockResolvedValue({ id: 'audit-2' }),
      } as any,
    };

    service = new DashboardService(prismaMock as PrismaService);
  });

  it('returns authentic overview metrics with zero counts when tables have no records', async () => {
    const overview = await service.getOverview(adminUser);

    expect(overview.contentStatus).toEqual({
      draft: 0,
      inReview: 0,
      approved: 0,
      published: 0,
      archived: 0,
      total: 0,
    });
    expect(overview.pendingReviewCount).toBe(0);
    expect(overview.recentlyUpdated).toEqual([]);
    expect(overview.recentlyPublished).toEqual([]);
    expect(overview.attentionItems).toEqual([]);
  });

  it('includes audit activity for users possessing audit.read permission', async () => {
    const overview = await service.getOverview(adminUser);

    expect(overview.recentActivity).toHaveLength(1);
    expect(overview.recentActivity[0].action).toBe('USER_LOGIN');
    expect(overview.recentActivity[0].userEmail).toBe('admin@aic-adt.org');
  });

  it('omits private audit activity for users lacking audit.read permission', async () => {
    const overview = await service.getOverview(editorUser);

    expect(overview.recentActivity).toEqual([]);
    expect((prismaMock.auditLog as any).findMany).not.toHaveBeenCalled();
  });

  it('gracefully handles database errors when recording audit logs', async () => {
    (prismaMock.auditLog as any).create.mockRejectedValue(new Error('DB connection closed'));

    await expect(
      service.recordAudit('user-1', 'LOGOUT', 'SESSION'),
    ).resolves.not.toThrow();
  });
});
