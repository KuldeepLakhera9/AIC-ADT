export interface ContentStatusSummary {
  draft: number;
  inReview: number;
  approved: number;
  published: number;
  archived: number;
  total: number;
}

export interface RecentlyUpdatedItem {
  id: string;
  title: string;
  contentType: 'PAGE' | 'PROGRAM' | 'STARTUP' | 'NEWS' | 'EVENT' | 'PUBLICATION';
  status: 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';
  updatedAt: string;
  updatedBy?: string;
}

export interface RecentlyPublishedItem {
  id: string;
  title: string;
  contentType: 'PAGE' | 'PROGRAM' | 'STARTUP' | 'NEWS' | 'EVENT' | 'PUBLICATION';
  publishedAt: string;
  slug: string;
}

export interface AttentionItem {
  id: string;
  type: 'PENDING_REVIEW' | 'UPCOMING_EVENT' | 'DRAFT_NOTICE';
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  link: string;
}

export interface RecentAuditActivity {
  id: string;
  action: string;
  resource: string;
  userEmail: string;
  userName: string;
  timestamp: string;
}

export interface DashboardOverviewResponse {
  contentStatus: ContentStatusSummary;
  pendingReviewCount: number;
  recentlyUpdated: RecentlyUpdatedItem[];
  recentlyPublished: RecentlyPublishedItem[];
  attentionItems: AttentionItem[];
  recentActivity: RecentAuditActivity[];
}
