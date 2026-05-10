import { TypographySmall } from "@/core/components/custom/ui/typography/Typography";
import Navigationbar from "./Navigationbar";

export default function FooterCopyright() {
  return (
    <div className="py-3 border-t border-border text-center">
      <TypographySmall className="text-muted-foreground">
        ساخته شده با 👈💗
      </TypographySmall>
      <Navigationbar />
    </div>
  );
}
