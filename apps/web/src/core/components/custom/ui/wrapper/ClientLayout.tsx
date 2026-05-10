"use client";

import * as React from "react";
import { MainHeader } from "./MainHeaderDashboard";
import { MainSidebar } from "./MainSidebarDashboard";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <main className="flex h-screen  bg-primary-foreground" dir="rtl">
      <MainSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <section className="flex-1 flex flex-col overflow-hidden bg-secondary-100 md:rounded-3xl">
        <MainHeader setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-y-auto ">{children}</div>
      </section>
    </main>
  );
}
