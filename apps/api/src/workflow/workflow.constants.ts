import { ContentStatus, ContentEntityType, Role } from '@prisma/client';
export { ContentStatus, ContentEntityType };

/**
 * Permitted Lifecycle State Transitions Graph according to Approved Workflow Spec
 */
export const VALID_STATUS_TRANSITIONS: Record<ContentStatus, readonly ContentStatus[]> = {
  [ContentStatus.DRAFT]: [
    ContentStatus.IN_REVIEW,
    ContentStatus.ARCHIVED,
  ],
  [ContentStatus.IN_REVIEW]: [
    ContentStatus.CHANGES_REQUESTED,
    ContentStatus.APPROVED,
    ContentStatus.DRAFT, // Author withdrawal
    ContentStatus.ARCHIVED,
  ],
  [ContentStatus.CHANGES_REQUESTED]: [
    ContentStatus.IN_REVIEW, // Re-submitted after corrections
    ContentStatus.DRAFT, // Returned to active draft
    ContentStatus.ARCHIVED,
  ],
  [ContentStatus.APPROVED]: [
    ContentStatus.PUBLISHED,
    ContentStatus.DRAFT, // Returned for changes if substantive edits needed
    ContentStatus.ARCHIVED,
  ],
  [ContentStatus.PUBLISHED]: [
    ContentStatus.ARCHIVED,
    // Note: Live published content is branched to staged draft revisions without mutating live status
  ],
  [ContentStatus.ARCHIVED]: [
    ContentStatus.DRAFT, // Safe restoration
  ],
};

/**
 * Workflow Audit Action Names
 */
export const WORKFLOW_ACTIONS = {
  SUBMIT_REVIEW: 'WORKFLOW_SUBMIT_REVIEW',
  WITHDRAW_REVIEW: 'WORKFLOW_WITHDRAW_REVIEW',
  REQUEST_CHANGES: 'WORKFLOW_REQUEST_CHANGES',
  APPROVE: 'WORKFLOW_APPROVE',
  APPROVE_ADMIN_OVERRIDE: 'WORKFLOW_APPROVE_ADMIN_OVERRIDE',
  PUBLISH: 'WORKFLOW_PUBLISH',
  BRANCH_REVISION: 'WORKFLOW_BRANCH_REVISION',
  ROLLBACK: 'WORKFLOW_ROLLBACK',
  ARCHIVE: 'WORKFLOW_ARCHIVE',
  RESTORE: 'WORKFLOW_RESTORE',
} as const;

/**
 * Roles permitted to approve content
 */
export const APPROVAL_ELIGIBLE_ROLES: readonly Role[] = [
  Role.APPROVER,
  Role.ADMIN,
];

/**
 * Roles permitted to publish content
 */
export const PUBLISH_ELIGIBLE_ROLES: readonly Role[] = [
  Role.APPROVER,
  Role.ADMIN,
  Role.CONTENT_EDITOR,
];

export const MIN_REVIEW_NOTE_LENGTH = 10;
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;
