"use client";

import { driversData } from "@/core/assets/mock/driversData";
import { faqs } from "@/core/assets/mock/faqMock";
import FAQWrapper from "@/core/components/custom/ui/faq/FAQWrapper";
import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import SwiperCarousel from "../../ui/swiper/SwiperCarousel";

function MotorcyclePageComponents() {
  const allFaqs = [...faqs.general, ...faqs["motorcycle"]];
  return (
    <SectionLayout>
      <div className="my-10 space-y-10">
        <SwiperCarousel items={driversData} title={"محبوب ترین ها"} />

        <FAQWrapper title={"پرسش‌های متداول"} faqs={allFaqs} />
      </div>
    </SectionLayout>
  );
}

export default MotorcyclePageComponents;
