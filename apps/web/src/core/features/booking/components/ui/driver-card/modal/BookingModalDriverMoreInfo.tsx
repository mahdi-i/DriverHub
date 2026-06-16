"use client";
import Modal from "@/core/components/custom/ui/modal/Modal";
import {
  TypographyH4,
  TypographyP,
} from "@/core/components/custom/ui/typography/Typography";
import { Badge } from "@/core/components/shadcn/ui/badge/badge";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { DriversBookingsTs } from "@/core/features/booking/assets/types/driversBookingsTs";
import { getGender } from "@/core/utils/getGender";
import { getLicenseTypeLabel } from "@/core/utils/getLicenseTypeLabel";
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  MapPin,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";

function BookingModalDriverMoreInfo({ driver }: { driver: DriversBookingsTs }) {
  const [isModalOpen, setisModalOpen] = useState(false);

  return (
    <Modal
      title={`مشاهده جزییات ${driver.name}`}
      open={isModalOpen}
      onOpenChange={setisModalOpen}
      trigger={
        <Button size="sm" variant="outline" className="w-full">
          جزییات بیشتر
        </Button>
      }
      hideDefaultFooter={true}
    >
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {driver.name?.charAt(0) || "-"}
            </div>
            <div>
              <TypographyH4>{driver.name}</TypographyH4>
              {driver.isComplete && (
                <Badge
                  variant="success"
                  className="gap-1 text-xs bg-green-100 text-success"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  پروفایل تایید شده
                </Badge>
              )}
            </div>
          </div>
          <Badge variant="outline"> {getGender(driver.gender)}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div>
              <TypographyP className="text-xs text-muted-foreground">
                شهر
              </TypographyP>
              <TypographyP className="font-medium">{driver.city}</TypographyP>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <div>
              <TypographyP className="text-xs text-muted-foreground">
                سابقه کاری
              </TypographyP>
              <TypographyP className="font-medium">
                {driver.experience} سال
              </TypographyP>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <div>
              <TypographyP className="text-xs text-muted-foreground">
                سن
              </TypographyP>
              <TypographyP className="font-medium">
                {driver.age} سال
              </TypographyP>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <div>
              <TypographyP className="text-xs text-muted-foreground">
                گواهینامه
              </TypographyP>
              <TypographyP className="font-medium">
                {getLicenseTypeLabel(driver.licenseType)}
              </TypographyP>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {driver.hasGlasses ? (
                <Eye className="w-5 h-5 text-secondary" />
              ) : (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="font-medium">وضعیت عینک</span>
            </div>
            <Badge variant={driver.hasGlasses ? "default" : "outline"}>
              {driver.hasGlasses ? "دارد" : "ندارد"}
            </Badge>
          </div>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Stethoscope className="w-5 h-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <TypographyP className="font-medium">وضعیت پزشکی</TypographyP>
              <TypographyP className="text-sm text-muted-foreground mt-1">
                {driver.medicalConditions === "ندارد" ||
                !driver.medicalConditions ? (
                  <span className="text-success">✓ بدون مشکل پزشکی خاص</span>
                ) : (
                  <span className="text-amber-600">
                    {driver.medicalConditions}
                  </span>
                )}
              </TypographyP>
              {driver.medicalConditions !== "ندارد" &&
                driver.medicalConditions && (
                  <TypographyP className="text-xs text-muted-foreground mt-2 border-t pt-2">
                    ⚠️ این راننده شرایط پزشکی دارد. لطفاً در صورت نیاز با
                    پشتیبانی تماس بگیرید.
                  </TypographyP>
                )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BookingModalDriverMoreInfo;
