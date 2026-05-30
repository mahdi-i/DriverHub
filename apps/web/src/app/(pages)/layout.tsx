import Footer from "@/core/features/main/components/blocks/footer/Footer";
import Header from "@/core/features/main/components/blocks/header/Header";
import HeroSection from "@/core/features/main/components/ui/hero-section/HeroSection";
import SupportWidget from "@/core/features/support/components/SupportWidget";
import { GetPayloadByLicense } from "@/core/lib/license/getPayloadByLicense";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "DriverHub",
  description:
    "Step up your shoe game with DriverHub! Find the latest styles for men and women, shop online, and get them fast.",
};

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const license = cookieStore.get("licenseToken")?.value;

  const getUserInfo = await GetPayloadByLicense(license);
  const userId = getUserInfo?.userId || null;
  const userRole = getUserInfo?.role || null;
  return (
    <main>
      <Header role={userRole} />
      <HeroSection />
      <SupportWidget userId={userId} />
      {children}
      <Footer />
    </main>
  );
}

export default layout;
