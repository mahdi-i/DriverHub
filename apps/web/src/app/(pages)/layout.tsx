import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import { Card } from "@/core/components/shadcn/ui/card/card";
import { DynamicSearchForm } from "@/core/features/booking/components/blocks/search/DynamicSearchForm";
import Footer from "@/core/features/main/components/blocks/footer/Footer";
import Header from "@/core/features/main/components/blocks/header/Header";
import { LicenseFilter } from "@/core/features/main/components/ui/filter/LicenseFilter";
import HeroImageMainPage from "@/core/features/main/components/ui/hero-img/HeroImageMainPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "kicks",
  description:
    "Step up your shoe game with Kicks! Find the latest styles for men and women, shop online, and get them fast.",
};

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />

      <HeroImageMainPage />
      <SectionLayout>
        <Card className="py-0 ">
          <LicenseFilter />
          <DynamicSearchForm />
        </Card>
      </SectionLayout>
      {children}
      <Footer />
    </main>
  );
}

export default layout;
