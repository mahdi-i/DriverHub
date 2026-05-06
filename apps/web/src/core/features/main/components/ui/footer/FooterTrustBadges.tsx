import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import { TypographyLarge } from "@/core/components/custom/ui/typography/Typography";

export default function FooterTrustBadges() {
  return (
    <div>
      <TypographyLarge className="font-bold mb-4 ">
        نمادهای اعتماد
      </TypographyLarge>
      <div className="flex  gap-4">
        <Badge
          src="/img/footer/license/ecunion-35c3c933.jpg"
          alt="نماد اعتماد"
        />
        <Badge src="/img/footer/license/enamad.png" alt="اینماد" />
        <Badge
          src="/img/footer/license/samandehi-6e2b448a.png"
          alt="نماد ساماندهی"
        />
      </div>
    </div>
  );
}

function Badge({ src, alt }: { src: string; alt: string }) {
  return (
    <ImgNormalCustom
      src={src}
      width={80}
      height={40}
      alt={alt}
      className="grayscale hover:grayscale-0 transition-all cursor-pointer"
    />
  );
}
