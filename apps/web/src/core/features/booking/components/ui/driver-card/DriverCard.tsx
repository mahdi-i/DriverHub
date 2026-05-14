import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyH4,
  TypographyP,
} from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

export function DriverCard({ driver }) {
  return (
    <Card>
      <CardContent className="p-4 flex gap-4 items-start">
        <ImgNormalCustom
          width={70}
          height={70}
          src="/img/dashboard/driver/profile/avatar-4c776756.svg"
          alt={driver.profile.fullName}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <TypographyH4>{driver.profile.fullName}</TypographyH4>
          </div>

          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <TypographyP>
              نوع گواهینامه: {driver.profile.licenseType}
            </TypographyP>
            <TypographyP>مدل خودرو: {driver.profile.carModel}</TypographyP>
            <TypographyP>رنگ خودرو: {driver.profile.carColor}</TypographyP>
            <TypographyP>سن: {driver.profile.age} سال</TypographyP>
            <TypographyP>
              تجربه: {driver.profile.experienceYears} سال
            </TypographyP>
            <TypographyP>شهر: {driver.profile.city}</TypographyP>
            <TypographyP>
              عینک: {driver.profile.hasGlasses ? "دارد" : "ندارد"}
            </TypographyP>
          </div>

          <div className="mt-4 flex gap-2">
            <Button>رزرو نوبت</Button>
            <Button variant="secondary">مشاهده جزئیات</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
