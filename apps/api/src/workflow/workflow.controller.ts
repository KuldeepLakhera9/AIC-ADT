import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseEnumPipe,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { PermissionsGuard } from '../auth/guards/permissions.guard.js';
import { RequirePermissions } from '../auth/decorators/require-permissions.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Permission } from '../auth/auth.types.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { ContentEntityType } from './workflow.constants.js';
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
  WorkflowTransitionResultDto,
} from './dto/workflow-response.dto.js';

@Controller('workflow')
@UseGuards(SessionAuthGuard, PermissionsGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  /**
   * Review Queue: Displays pending content for authorized editors, reviewers, and approvers.
   */
  @Get('review-queue')
  @RequirePermissions(Permission.CONTENT_READ)
  async getReviewQueue(
    @Query() query: QueryReviewQueueDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<PaginatedReviewQueueDto> {
    return this.workflowService.getReviewQueue(query, user);
  }

  /**
   * Submit draft for editorial review.
   */
  @Post('entities/:entityType/:id/submit-review')
  @RequirePermissions(Permission.CONTENT_SUBMIT_REVIEW)
  @HttpCode(HttpStatus.OK)
  async submitForReview(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Body() dto: WorkflowSubmitReviewDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    return this.workflowService.submitForReview(entityType, id, dto, user);
  }

  /**
   * Request editorial changes with mandatory comments.
   */
  @Post('entities/:entityType/:id/request-changes')
  @RequirePermissions(Permission.CONTENT_REVIEW)
  @HttpCode(HttpStatus.OK)
  async requestChanges(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Body() dto: WorkflowRequestChangesDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    return this.workflowService.requestChanges(entityType, id, dto, user);
  }

  /**
   * Approve submitted revision (Enforces Dual-Custody / Anti-Self-Approval).
   */
  @Post('entities/:entityType/:id/approve')
  @RequirePermissions(Permission.CONTENT_APPROVE)
  @HttpCode(HttpStatus.OK)
  async approveContent(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Body() dto: WorkflowApproveContentDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    return this.workflowService.approveContent(entityType, id, dto, user);
  }

  /**
   * Publish approved revision live (with optimistic concurrency check).
   */
  @Post('entities/:entityType/:id/publish')
  @RequirePermissions(Permission.CONTENT_PUBLISH)
  @HttpCode(HttpStatus.OK)
  async publishContent(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Body() dto: WorkflowPublishContentDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    return this.workflowService.publishContent(entityType, id, dto, user);
  }

  /**
   * Branch a new revision draft without disrupting live published content.
   */
  @Post('entities/:entityType/:id/branch-revision')
  @RequirePermissions(Permission.CONTENT_UPDATE)
  @HttpCode(HttpStatus.CREATED)
  async branchRevision(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Body() dto: WorkflowBranchRevisionDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    return this.workflowService.branchRevision(entityType, id, dto, user);
  }

  /**
   * Safe non-destructive rollback to a historical snapshot.
   */
  @Post('entities/:entityType/:id/rollback')
  @RequirePermissions(Permission.CONTENT_UPDATE)
  @HttpCode(HttpStatus.OK)
  async rollbackRevision(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Body() dto: WorkflowRollbackRevisionDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<WorkflowTransitionResultDto> {
    return this.workflowService.rollbackRevision(entityType, id, dto, user);
  }

  /**
   * Retrieve historical revisions and diff snapshots.
   */
  @Get('entities/:entityType/:id/revisions')
  @RequirePermissions(Permission.CONTENT_READ)
  async getRevisions(
    @Param('entityType', new ParseEnumPipe(ContentEntityType)) entityType: ContentEntityType,
    @Param('id') id: string,
    @Query('locale') locale: string = 'en',
  ): Promise<ContentRevisionDto[]> {
    return this.workflowService.getRevisions(entityType, id, locale);
  }

  /**
   * Retrieve immutable audit trail records.
   */
  @Get('audit-logs')
  @RequirePermissions(Permission.AUDIT_READ)
  async getAuditLogs(@Query() query: QueryAuditLogsDto): Promise<PaginatedAuditLogsDto> {
    return this.workflowService.getAuditLogs(query);
  }
}
