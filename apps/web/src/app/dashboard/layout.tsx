import ClientLayout from "@/core/components/custom/ui/wrapper/ClientLayout";
import ContainerDashboard from "@/core/components/custom/ui/wrapper/ContainerDashboard";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import type React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const license = await getAccessTokenSSR();
  console.log(license, "license");
  return (
    <ClientLayout license={license}>
      <ContainerDashboard>{children}</ContainerDashboard>
    </ClientLayout>
  );
}
