import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { legalLinks, quickLinks } from "../../../assets/mock/linksmock";

export default function FooterLinksAndContact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-border">
      <div>
        <ImgNormalCustom
          src="/img/logo/shawl_logotype-d6b14ca0.svg"
          width={120}
          height={40}
          alt="DriverHub"
          className="mb-4"
        />
        <TypographyMuted className="text-sm leading-relaxed mb-4">
          اولین و بزرگترین پلتفرم تخصصی رزرو نوبت آموزشگاه‌های رانندگی در ایران
        </TypographyMuted>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-primary" />
            <TypographySpan className="text-text-light text-sm">
              ۰۲۱-۱۲۳۴۵۶۷۸
            </TypographySpan>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-primary" />
            <TypographySpan className="text-text-light text-sm">
              info@driverhub.com
            </TypographySpan>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <TypographySpan className="text-text-light text-sm">
              تهران، خیابان ولیعصر، پلاک ۱۲۳
            </TypographySpan>
          </div>
        </div>
      </div>

      <div>
        <TypographyLarge className="font-bold mb-4 block">
          لینک‌های سریع
        </TypographyLarge>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <TypographyLarge className="font-bold mb-4 block">
          اطلاعات مفید
        </TypographyLarge>
        <ul className="space-y-2">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <TypographyLarge className="font-bold mb-4 block">
          نمادهای اعتماد
        </TypographyLarge>
        <div className="flex gap-4 flex-wrap">
          <ImgNormalCustom
            src="/img/footer/license/ecunion-35c3c933.jpg"
            width={80}
            height={40}
            alt="نماد اعتماد"
            className="grayscale hover:grayscale-0 transition-all"
          />
          <ImgNormalCustom
            src="/img/footer/license/enamad.png"
            width={80}
            height={40}
            alt="اینماد"
            className="grayscale hover:grayscale-0 transition-all"
          />
          <ImgNormalCustom
            src="/img/footer/license/samandehi-6e2b448a.png"
            width={80}
            height={40}
            alt="نماد ساماندهی"
            className="grayscale hover:grayscale-0 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
