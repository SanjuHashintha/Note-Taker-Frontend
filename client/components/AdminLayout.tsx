import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-gold-50/30 to-gray-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 bg-gradient-to-br from-navy-25/50 to-gray-50/80">
          {children}
        </main>
      </div>
    </div>
  );
}
