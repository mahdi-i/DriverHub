import { legalLinks, quickLinks } from "../../../assets/mock/linksmock";
import FooterLinksGroup from "./FooterLinksGroup";
import FooterLogoAndInfo from "./FooterLogoAndInfo";
import FooterTrustBadges from "./FooterTrustBadges";

export default function FooterLinksAndContact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-t border-border">
      <FooterLogoAndInfo />

      <FooterLinksGroup title="لینک‌های سریع" links={quickLinks} />

      <FooterLinksGroup title="اطلاعات مفید" links={legalLinks} />

      <FooterTrustBadges />
    </div>
  );
}
