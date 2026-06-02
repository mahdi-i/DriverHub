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

  if (!payloadLicense?.driverId) {
    redirect("/");
  }
  const driverId = payloadLicense.driverId;

  return (
    <ClientLayout driverId={driverId}>
      <ContainerDashboard>{children}</ContainerDashboard>
    </ClientLayout>
  );
}
