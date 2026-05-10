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
    <main className="flex h-screen bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />

      <div className="absolute top-0 left-0 w-125 h-125 bg-[#fdb913]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#0077db]/25 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <MainSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <section className="flex-1 flex flex-col overflow-hidden">
        <MainHeader setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-y-auto">{children}</div>
      </section>
    </main>
  );
}
