import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { TypographyH3 } from "@/core/components/custom/ui/typography/Typography";

interface ModalHeaderProps {
  title: string;
  description?: string;
  subDescription?: string;
}

export default function ModalHeader({
  title,
  description,
  subDescription,
}: ModalHeaderProps) {
  return (
    <div className="text-center">
      <TypographyH3 className="mb-1">{title}</TypographyH3>

      {description && (
        <TypographyP className="text-sm text-muted-foreground">
          {description}
        </TypographyP>
      )}

      {subDescription && (
        <TypographyP className="text-xs text-muted-foreground mt-1">
          {subDescription}
        </TypographyP>
      )}
    </div>
  );
}