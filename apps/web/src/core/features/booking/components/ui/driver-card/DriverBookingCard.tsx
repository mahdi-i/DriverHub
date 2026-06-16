import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyMuted,
  TypographyP,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { getGender } from "@/core/utils/getGender";
import { getLicenseTypeLabel } from "@/core/utils/getLicenseTypeLabel";
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";
import { DriversBookingsTs } from "../../../assets/types/driversBookingsTs";
import RedirectBookinkBtn from "./RedirectBookinkBtn";
export default function DriverBookingCard({
  driver,
}: {
  driver: DriversBookingsTs;
}) {
  return (
    <Card className="w-full border-border/60">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm bg-muted">
              <ImgNormalCustom
                src={"/img/dashboard/driver/profile/avatar-4c776756.svg"}
                alt={driver.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TypographyP className="font-semibold text-lg">
                  {driver.name}
                </TypographyP>
                {driver.isComplete && (
                  <Badge
                    variant="secondary"
                    className="gap-1 text-xs bg-green-100 text-success hover:bg-green-200"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    تایید شده
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <TypographyMuted className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {driver.city}
                </TypographyMuted>
                <TypographyMuted className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {driver.experience} سال سابقه
                </TypographyMuted>
                <TypographyMuted className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {driver.age} ساله
                </TypographyMuted>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Badge
                  variant="outline"
                  className="text-xs font-medium border-primary/20 bg-primary/5"
                >
                  گواهینامه {getLicenseTypeLabel(driver.licenseType)}
                </Badge>

                <div className="flex items-center gap-1 text-primary text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <TypographySpan>{getGender(driver.gender)}</TypographySpan>
                </div>
              </div>
            </div>
          </div>

          <RedirectBookinkBtn driver={driver} />
        </div>
      </CardContent>
    </Card>
  );
}
