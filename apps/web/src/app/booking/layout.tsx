import Footer from "@/core/features/main/components/blocks/footer/Footer";
import Header from "@/core/features/main/components/blocks/header/Header";
import { GetPayloadByLicense } from "@/core/lib/license/getPayloadByLicense";
import { cookies } from "next/headers";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const license = cookieStore.get("licenseToken")?.value;
  const getUserInfo = await GetPayloadByLicense(license);
  const userRole = getUserInfo?.role || null;
  console.log(getUserInfo);
  console.log(license);
  return (
    <main className="bg-secondary-foreground">
      <Header role={userRole} />

      {children}
      <Footer />
    </main>
  );
}

export default layout;
