import ClientLayout from "@/core/components/custom/ui/wrapper/ClientLayout";
import ContainerDashboard from "@/core/components/custom/ui/wrapper/ContainerDashboard";
import type { Metadata } from "next";
import type React from "react";
export const metadata: Metadata = {
  title: "داشبورد ادمین آرایش تایم",
  description: "پنل هوشمند مدریت رزرو انلاین",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <ContainerDashboard>{children}</ContainerDashboard>
    </ClientLayout>
  );
}
