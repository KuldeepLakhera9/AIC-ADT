import { Role } from '@prisma/client';
export { Role, UserStatus } from '@prisma/client';

/**
 * AIC-ADT Baramati Foundation — Granular Permissions
 */
export enum Permission {
  DASHBOARD_READ = 'dashboard.read',
  CONTENT_READ = 'content.read',
  CONTENT_CREATE = 'content.create',
  CONTENT_UPDATE = 'content.update',
  CONTENT_SUBMIT_REVIEW = 'content.submit_review',
  CONTENT_REVIEW = 'content.review',
  CONTENT_APPROVE = 'content.approve',
  CONTENT_PUBLISH = 'content.publish',
  CONTENT_ARCHIVE = 'content.archive',
  MEDIA_READ = 'media.read',
  MEDIA_UPLOAD = 'media.upload',
  MEDIA_UPDATE = 'media.update',
  MEDIA_DELETE = 'media.delete',
  USERS_READ = 'users.read',
  USERS_MANAGE = 'users.manage',
  ROLES_MANAGE = 'roles.manage',
  AUDIT_READ = 'audit.read',
  APPLICATIONS_REVIEW = 'applications.review',
  IMPACT_MANAGE = 'impact.manage',
}

/**
 * Authoritative Mapping: Roles to Granular Permissions
 */
export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),

  [Role.CONTENT_EDITOR]: [
    Permission.DASHBOARD_READ,
    Permission.CONTENT_READ,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_UPDATE,
    Permission.CONTENT_SUBMIT_REVIEW,
    Permission.MEDIA_READ,
    Permission.MEDIA_UPLOAD,
    Permission.MEDIA_UPDATE,
    Permission.AUDIT_READ,
  ],

  [Role.APPROVER]: [
    Permission.DASHBOARD_READ,
    Permission.CONTENT_READ,
    Permission.CONTENT_REVIEW,
    Permission.CONTENT_APPROVE,
    Permission.CONTENT_PUBLISH,
    Permission.CONTENT_ARCHIVE,
    Permission.MEDIA_READ,
    Permission.MEDIA_UPDATE,
    Permission.AUDIT_READ,
  ],

  [Role.PROGRAM_MANAGER]: [
    Permission.DASHBOARD_READ,
    Permission.CONTENT_READ,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_UPDATE,
    Permission.CONTENT_SUBMIT_REVIEW,
    Permission.MEDIA_READ,
    Permission.MEDIA_UPLOAD,
    Permission.MEDIA_UPDATE,
  ],

  [Role.IMPACT_MANAGER]: [
    Permission.DASHBOARD_READ,
    Permission.CONTENT_READ,
    Permission.IMPACT_MANAGE,
    Permission.MEDIA_READ,
  ],

  [Role.REVIEWER]: [
    Permission.DASHBOARD_READ,
    Permission.CONTENT_READ,
    Permission.CONTENT_REVIEW,
    Permission.APPLICATIONS_REVIEW,
  ],

  [Role.PUBLIC_APPLICANT]: [],
};

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: string;
  permissions: Permission[];
}
