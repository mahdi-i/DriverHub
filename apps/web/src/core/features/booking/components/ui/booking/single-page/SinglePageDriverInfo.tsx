import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { getLicenseTypeLabel } from "@/core/utils/getLicenseTypeLabel";
function SinglePageDriverInfo({ data }) {
  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <ImgNormalCustom
            src={"/img/dashboard/driver/profile/avatar-4c776756.svg"}
            width={70}
            height={70}
            alt="profile"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <TypographyLarge>{data.fullName}</TypographyLarge>
            <TypographyMuted>{data.user?.phone || "-"}</TypographyMuted>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center space-x-1 overflow-auto gap-1">
          <div className="bg-muted p-1 rounded-sm flex items-center gap-1">
            <TypographySpan>نوع:</TypographySpan>
            <TypographyMuted>
              {getLicenseTypeLabel(data.licenseType)}
            </TypographyMuted>
          </div>
          <div className="bg-muted p-1 rounded-sm flex items-center gap-1">
            <TypographySpan>سن:</TypographySpan>
            <TypographyMuted>{data.age} سال</TypographyMuted>
          </div>
          <div className="bg-muted p-1 rounded-sm flex items-center gap-1">
            <TypographySpan>آدرس:</TypographySpan>
            <TypographyMuted>
              {data.city}/{data.address}
            </TypographyMuted>
          </div>
          <div className="bg-muted p-1 rounded-sm flex items-center gap-2">
            <TypographySpan>مدل خودرو:</TypographySpan>
            <TypographyMuted>{data.carColor}</TypographyMuted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SinglePageDriverInfo;
