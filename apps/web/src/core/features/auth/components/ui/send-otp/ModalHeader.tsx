import {
  TypographyH3,
  TypographyP,
  TypographySmall,
} from "@/core/components/custom/ui/typography/Typography";

interface ModalHeaderProps {
  title: string;
  description?: string;
  subDescription?: string;
  phoneNumber?: string;
}

export default function ModalHeader({
  title,
  description,
  subDescription,
  phoneNumber,
}: ModalHeaderProps) {
  return (
    <div className="text-center">
      <TypographyH3 className="mb-1">{title}</TypographyH3>
      {description && (
        <TypographyP>
          {description}
          {phoneNumber && (
            <>
              برای شماره <TypographySmall>{phoneNumber}</TypographySmall>
            </>
          )}
        </TypographyP>
      )}
      {subDescription && (
        <TypographyP className="mt-1">{subDescription}</TypographyP>
      )}
    </div>
  );
}
