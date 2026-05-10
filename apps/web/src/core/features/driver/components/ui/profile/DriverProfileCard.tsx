import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { getGender } from "@/core/utils/getGender";
import { GenderEnum } from "@driverhub/shared-types";

function DriverProfileCard() {
  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <ImgNormalCustom
            src="/img/dashboard/driver/profile/avatar-4c776756.svg"
            width={70}
            height={70}
            alt="profile"
          />
          <TypographyLarge>09134117601</TypographyLarge>
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <div className="bg-muted p-2 rounded-sm flex items-center gap-2">
            <TypographySpan>نام کامل:</TypographySpan>
            <TypographyMuted>سوگند سنیور</TypographyMuted>
          </div>
          <div className="bg-muted p-2 rounded-sm flex items-center gap-2">
            <TypographySpan>جنسیت:</TypographySpan>
            <TypographyMuted>{getGender(GenderEnum.FEMALE)}</TypographyMuted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DriverProfileCard;
