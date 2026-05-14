import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import { Card } from "@/core/components/shadcn/ui/card/card";
import { DynamicSearchForm } from "@/core/features/booking/components/blocks/search/DynamicSearchForm";
import { LicenseFilter } from "../filter/LicenseFilter";
import HeroImageMainPage from "../hero-img/HeroImageMainPage";
import MapSectionMainPage from "../home-page/MapSectionMainPage";

async function HeroSection() {
  return (
    <>
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
    </>
  );
}

export default HeroSection;
