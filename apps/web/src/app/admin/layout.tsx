import type { Metadata } from 'next';
import { Suspense } from 'react';
import AdminShell from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Institutional Administration Console | AIC-ADT Baramati',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 p-8 flex items-center justify-center font-mono text-sm">Loading administration console...</div>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
