import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { PermissionsGuard } from '../auth/guards/permissions.guard.js';
import { RequirePermissions } from '../auth/decorators/require-permissions.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Permission } from '../auth/auth.types.js';
import { AuthUserDto } from '../auth/dto/auth-user.dto.js';
import { DashboardOverviewResponse } from './dashboard.types.js';

@Controller('dashboard')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @RequirePermissions(Permission.DASHBOARD_READ)
  async getOverview(
    @CurrentUser() user: AuthUserDto,
  ): Promise<DashboardOverviewResponse> {
    return this.dashboardService.getOverview(user);
  }
}
