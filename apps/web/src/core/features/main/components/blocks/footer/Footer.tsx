import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import FooterCopyright from "../../ui/footer/FooterCopyright";
import FooterLinksAndContact from "../../ui/footer/FooterLinksAndContact";
import FooterWhyUs from "../../ui/footer/FooterWhyUs";
import Navigationbar from "../../ui/footer/Navigationbar";

export default function Footer() {
  return (
    <footer className="bg-background mt-auto">
      <hr />
      <SectionLayout>
        <FooterWhyUs />
        <FooterLinksAndContact />
        <FooterCopyright />
        <Navigationbar />
      </SectionLayout>
    </footer>
  );
}
