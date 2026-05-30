"use client";

import { driversData } from "@/core/assets/mock/driversData";
import { faqs } from "@/core/assets/mock/faqMock";
import FAQWrapper from "@/core/components/custom/ui/faq/FAQWrapper";
import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import SwiperCarousel from "../../ui/swiper/SwiperCarousel";

function CarBaseOnePageComponents() {
  const allFaqs = [...faqs.general, ...faqs["car-base1"]];

  return (
    <SectionLayout>
      <div className="my-10 space-y-10">
        <SwiperCarousel items={driversData} title={"برترین رانندگان"} />

        <FAQWrapper title={"پرسش‌های متداول"} faqs={allFaqs} />
      </div>
    </SectionLayout>
  );
}

export default CarBaseOnePageComponents;
