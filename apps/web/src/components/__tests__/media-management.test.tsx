import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MediaManager } from '../admin/media/MediaManager';
import AdminMediaPage from '@/app/admin/media/page';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useParams: () => ({ id: 'media-test-uuid-1' }),
  usePathname: () => '/admin/media',
}));

describe('Media Management Frontend Suite', () => {
  it('renders MediaManager component with title and upload trigger', () => {
    const html = renderToStaticMarkup(<MediaManager />);

    expect(html).toContain('Media &amp; Asset Repository');
    expect(html).toContain('Upload Media File');
    expect(html).toContain('Search filename, alt text, or caption...');
    expect(html).toContain('All Types');
    expect(html).toContain('All Visibility');
  });

  it('renders AdminMediaPage wrapping MediaManager', () => {
    const html = renderToStaticMarkup(<AdminMediaPage />);

    expect(html).toContain('Media &amp; Asset Repository');
    expect(html).toContain('Grid');
    expect(html).toContain('Table');
  });

  it('contains accessible search and filter controls', () => {
    const html = renderToStaticMarkup(<MediaManager />);

    expect(html).toContain('Filter by media type');
    expect(html).toContain('Filter by visibility');
    expect(html).toContain('Search media by title');
    expect(html).toContain('Upload Media File');
  });
});
