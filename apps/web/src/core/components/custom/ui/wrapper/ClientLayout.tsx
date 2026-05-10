"use client";
import * as React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <main className="flex h-screen overflow-hidden bg-muted">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <section className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-x-auto">{children}</div>
      </section>
    </main>
  );
}
