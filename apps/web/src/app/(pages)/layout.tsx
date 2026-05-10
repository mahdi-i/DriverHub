import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import { Card } from "@/core/components/shadcn/ui/card/card";
import { DynamicSearchForm } from "@/core/features/booking/components/blocks/search/DynamicSearchForm";
import Footer from "@/core/features/main/components/blocks/footer/Footer";
import Header from "@/core/features/main/components/blocks/header/Header";
import { LicenseFilter } from "@/core/features/main/components/ui/filter/LicenseFilter";
import HeroImageMainPage from "@/core/features/main/components/ui/hero-img/HeroImageMainPage";
import MapSectionMainPage from "@/core/features/main/components/ui/home-page/MapSectionMainPage";
import { Metadata } from "next";

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
  return (
    <main>
      <Header />
      <section className="relative w-full mb-35 hidden md:flex">
        <HeroImageMainPage />
        <div className="absolute -bottom-59 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-300  z-10">
          <Card className="w-full py-4 ">
            <LicenseFilter />
            <DynamicSearchForm />
          </Card>
        </div>
      </section>
      <SectionLayout>
        <MapSectionMainPage />
      </SectionLayout>
      {children}
      <Footer />
    </main>
  );
}

export default layout;
