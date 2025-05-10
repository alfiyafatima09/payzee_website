import type { Metadata } from 'next';
import './globals.css';
import { SidebarWrapper } from '@/components/SidebarWrapper';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'PayZee',
  description: 'Created by Payzee'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  // Hide sidebar on /auth route
  const hideSidebar = pathname.startsWith('/auth');

  return (
    <html lang="en">
      <body className="flex">
        {!hideSidebar && <SidebarWrapper />}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
