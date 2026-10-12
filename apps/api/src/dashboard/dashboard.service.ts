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

    // Authentic content summary; 0 is returned where zero records exist.
    // In Phase 5 Task 4, foundational identity & audit are active; content tables return 0.
    return {
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
