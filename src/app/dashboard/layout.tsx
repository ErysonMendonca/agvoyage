import React from 'react';
import SystemLayout from '@/components/layout/SystemLayout';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SystemLayout>{children}</SystemLayout>;
}
