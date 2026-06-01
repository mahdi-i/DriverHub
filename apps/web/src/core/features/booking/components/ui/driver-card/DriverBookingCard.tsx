import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import {
  TypographyMuted,
  TypographyP,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { getLicenseTypeLabel } from "@/core/utils/getLicenseTypeLabel";
import { LicenseTypeEnum } from "@driverhub/shared-types";
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";
import { redirect } from "next/navigation";
import BookingModalDriverMoreInfo from "./modal/BookingModalDriverMoreInfo";
export default function DriverBookingCard({
  driver,
}: {
  driver: {
    id: string;
    name: string;
    avatar: string;
    licenseType: LicenseTypeEnum;
    experience: number;
    rating: number;
    age: number;
    city: string;
    isComplete: boolean;
    hasGlasses: boolean;
    medicalConditions: string;
  };
}) {
  return (
    <Card className="w-full border-border/60">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm bg-muted">
              {driver.avatar ? (
                <ImgNormalCustom
                  src={driver.avatar}
                  alt={driver.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                  {driver.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TypographyP className="font-semibold text-lg">
                  {driver.name}
                </TypographyP>
                {driver.isComplete && (
                  <Badge
                    variant="secondary"
                    className="gap-1 text-xs bg-green-100 text-green-700 hover:bg-green-200"
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

                <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <TypographySpan>{driver.rating}</TypographySpan>
                </div>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
            <div className="flex-col flex  w-full md:flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="w-full"
                onClick={() => redirect(`/booking/${driver.id}`)}
              >
                رزرو
              </Button>
              <BookingModalDriverMoreInfo driver={driver} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
