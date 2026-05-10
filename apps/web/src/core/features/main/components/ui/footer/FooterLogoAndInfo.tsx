import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyMuted,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Mail, MapPin, Phone } from "lucide-react";

export default function FooterLogoAndInfo() {
  return (
    <div className="flex flex-col gap-4">
      <ImgNormalCustom
        src="/img/logo/shawl_logotype-d6b14ca0.svg"
        width={120}
        height={40}
        alt="DriverHub"
        className="mb-2"
      />
      <TypographyMuted className="text-sm leading-relaxed">
        اولین و بزرگترین پلتفرم تخصصی رزرو نوبت آموزشگاه‌های رانندگی در ایران
      </TypographyMuted>

      <div className="space-y-3 mt-2">
        <ContactItem
          icon={<Phone className="h-4 w-4 text-primary" />}
          text="۰۲۱-۱۲۳۴۵۶۷۸"
        />
        <ContactItem
          icon={<Mail className="h-4 w-4 text-primary" />}
          text="info@driverhub.com"
        />
        <ContactItem
          icon={<MapPin className="h-4 w-4 text-primary" />}
          text="تهران، خیابان ولیعصر، پلاک ۱۲۳"
        />
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <TypographySpan className="text-text-light text-sm">
        {text}
      </TypographySpan>
    </div>
  );
}
