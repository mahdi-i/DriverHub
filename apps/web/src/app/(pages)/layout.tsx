import Footer from "@/core/features/main/components/blocks/footer/Footer";
import Header from "@/core/features/main/components/blocks/header/Header";
import GETUSER from "@/core/features/main/components/ui/hero-section/GETUSER";
import HeroSection from "@/core/features/main/components/ui/hero-section/HeroSection";
import SupportWidget from "@/core/features/support/components/SupportWidget";
import { BASE_URL } from "@/core/lib/basic-link/backendBasicLink";
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
  console.log(license, "license");
  const res = await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${license}`,
    },
  });
  console.log(res);
  const ress = await fetch(`${BASE_URL}/user/me`, {
    method: "GET",

    credentials: "include",
  });
  console.log(ress, "resss");
  const user = await res.json();
  console.log(user);
  return (
    <main>
      <Header />
      <HeroSection />
      <GETUSER user={user} />
      <SupportWidget userId={user.id} isAdmin={false} />
      {children}
      <Footer />
    </main>
  );
}

export default layout;
