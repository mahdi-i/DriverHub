"use client";
import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import { useIsMobile } from "@/core/hooks/useIsMobile";

function HeroImageMainPage() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <section className="w-full  justify-center items-center hidden md:flex">
      <ImgNormalCustom
        src={"/img/main/home/hero-824e4df4.webp"}
        alt="hero img"
        width={2000}
        height={50}
      />
    </section>
  );
}

export default HeroImageMainPage;
