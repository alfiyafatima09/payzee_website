import type { Metadata } from 'next';
import './globals.css';
import { SidebarWrapper } from '@/components/SidebarWrapper';

export const metadata: Metadata = {
  title: 'PayZee',
  description: 'Created by Payzee'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <SidebarWrapper />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
