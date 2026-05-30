import ClientLayout from "@/core/components/custom/ui/wrapper/ClientLayout";
import ContainerDashboard from "@/core/components/custom/ui/wrapper/ContainerDashboard";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { GetPayloadByLicense } from "@/core/lib/license/getPayloadByLicense";
import { forbidden } from "next/navigation";
import type React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const license = await getAccessTokenSSR();
  const payloadLicense = await GetPayloadByLicense(license);
  const driverId = payloadLicense.driverId;
  console.log(license, "license");
  if (!license) {
    return forbidden();
  }
  return (
    <ClientLayout license={license} driverId={driverId}>
      <ContainerDashboard>{children}</ContainerDashboard>
    </ClientLayout>
  );
}
