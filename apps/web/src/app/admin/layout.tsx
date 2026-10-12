import type { Metadata } from 'next';

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
    <div className="admin-console-wrapper min-h-screen bg-slate-900">
      {children}
    </div>
  );
}
