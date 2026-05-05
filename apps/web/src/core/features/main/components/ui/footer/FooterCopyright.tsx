import { TypographySmall } from "@/core/components/custom/ui/typography/Typography";

export default function FooterCopyright() {
  return (
    <div className="py-6 border-t border-border text-center">
      <TypographySmall className="text-muted-foreground">
        © {new Date().getFullYear()} DriverHub. تمامی حقوق محفوظ است.
      </TypographySmall>
    </div>
  );
}
