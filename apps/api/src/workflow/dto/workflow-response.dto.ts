import { ContentEntityType, ContentStatus } from '../workflow.constants.js';

export interface ReviewQueueItemDto {
  id: string;
  entityType: ContentEntityType;
  entityId: string;
  slug: string;
  title: string;
  locale: string;
  status: ContentStatus;
  versionNumber: number;
  authorId: string | null;
  authorName: string;
  authorEmail: string;
  submittedAt: string;
  lastUpdatedAt: string;
  reviewerNotes?: string | null;
  availableActions: string[];
  selfAuthored: boolean;
}

export interface PaginatedReviewQueueDto {
  data: ReviewQueueItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContentRevisionDto {
  id: string;
  entityType: ContentEntityType;
  entityId: string;
  versionNumber: number;
  locale: string;
  status: ContentStatus;
  dataSnapshot: Record<string, unknown>;
  authorId: string | null;
  authorName?: string;
  reviewerId: string | null;
  reviewerName?: string;
  reviewNotes: string | null;
  changelog: string | null;
  createdAt: string;
}

export interface AuditLogDto {
  id: string;
  userId: string | null;
  userEmail?: string;
  userName?: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface PaginatedAuditLogsDto {
  data: AuditLogDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface WorkflowTransitionResultDto {
  success: boolean;
  message: string;
  entityType: ContentEntityType;
  entityId: string;
  locale: string;
  previousStatus: ContentStatus;
  currentStatus: ContentStatus;
  versionNumber: number;
  revisionId?: string;
  updatedAt: string;
}
