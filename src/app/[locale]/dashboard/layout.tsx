import React from "react";
import DashboardTabs from "./_components/DashboardTabs";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <DashboardTabs locale={locale} />
      {children}
    </>
  );
}
