import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ReviewQueueManager from '../admin/workflow/ReviewQueueManager';
import AuditTrailViewer from '../admin/workflow/AuditTrailViewer';
import AdminReviewQueuePage from '@/app/admin/review-queue/page';
import AdminAuditPage from '@/app/admin/audit/page';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => '/admin/review-queue',
}));

describe('Editorial Workflow & Audit Trail Frontend Suite', () => {
  it('renders ReviewQueueManager with dual-custody notice, filter tabs, and refresh button', () => {
    const html = renderToStaticMarkup(<ReviewQueueManager />);

    expect(html).toContain('Editorial Review Queue');
    expect(html).toContain('Dual-Custody Governed');
    expect(html).toContain('All Pending');
    expect(html).toContain('In Review');
    expect(html).toContain('Changes Requested');
    expect(html).toContain('Approved');
    expect(html).toContain('Refreshing...');
    expect(html).toContain('View Audit Trail');
  });

  it('renders AdminReviewQueuePage wrapping ReviewQueueManager', () => {
    const html = renderToStaticMarkup(<AdminReviewQueuePage />);

    expect(html).toContain('Editorial Review Queue');
    expect(html).toContain('Dual-Custody Governed');
    expect(html).toContain('Search queue...');
  });

  it('renders AuditTrailViewer with retention policy, action filters, and append-only badge', () => {
    const html = renderToStaticMarkup(<AuditTrailViewer />);

    expect(html).toContain('Security &amp; Editorial Audit Trail');
    expect(html).toContain('Append-Only • WORM Verified');
    expect(html).toContain('Institutional Retention &amp; Non-Repudiation Policy');
    expect(html).toContain('Retention: 7 Years');
    expect(html).toContain('WORKFLOW_SUBMIT_REVIEW');
    expect(html).toContain('WORKFLOW_APPROVE');
    expect(html).toContain('WORKFLOW_REQUEST_CHANGES');
    expect(html).toContain('WORKFLOW_ROLLBACK');
    expect(html).toContain('Refreshing...');
  });

  it('renders AdminAuditPage wrapping AuditTrailViewer', () => {
    const html = renderToStaticMarkup(<AdminAuditPage />);

    expect(html).toContain('Security &amp; Editorial Audit Trail');
    expect(html).toContain('Search action or resource...');
  });
});
