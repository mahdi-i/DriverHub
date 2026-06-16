import ClientLayout from "@/core/components/custom/ui/wrapper/ClientLayout";
import ContainerDashboard from "@/core/components/custom/ui/wrapper/ContainerDashboard";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { GetPayloadByLicense } from "@/core/lib/license/getPayloadByLicense";
import { redirect } from "next/navigation";
import type React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const license = await getAccessTokenSSR();
  if (!license) {
    redirect("/");
  }
  const payloadLicense = await GetPayloadByLicense(license);
  console.log(payloadLicense);

  return (
    <ClientLayout license={license}>
      <ContainerDashboard>{children}</ContainerDashboard>
    </ClientLayout>
  );
}
