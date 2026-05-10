"use client";

import {
  TypographyH4,
  TypographyLarge,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

import FileUpload from "@/core/components/custom/ui/file-input/FileUpload";
import { additionalinitialInfo } from "../../../assets/mock/carData";
import AdditionalModalDriverInfoCard from "./modal/AdditionalModalDriverInfoCard";

function AdditionalDriverInfoCard() {
  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-2/4">
          <FileUpload
            label="آپلود تصویر گواهینامه"
            accept="image/*"
            onFileChange={(file) => {
              if (file) console.log("فایل انتخاب شد:", file.name);
            }}
          />
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-5">
            <TypographyH4>اطلاعات تکمیلی</TypographyH4>
            <AdditionalModalDriverInfoCard />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <TypographySpan className="text-sm text-muted-foreground">
                سن
              </TypographySpan>
              <TypographyLarge className="text-base">
                {additionalinitialInfo.age}
              </TypographyLarge>
            </div>
            <div className="space-y-1">
              <TypographySpan className="text-sm text-muted-foreground">
                کد ملی
              </TypographySpan>
              <TypographyLarge className="text-base">
                {additionalinitialInfo.nationalCode}
              </TypographyLarge>
            </div>
            <div className="space-y-1">
              <TypographySpan className="text-sm text-muted-foreground">
                دارای عینک
              </TypographySpan>
              <TypographyLarge className="text-base">
                {additionalinitialInfo.hasGlasses ? "بله" : "خیر"}
              </TypographyLarge>
            </div>
            <div className="space-y-1">
              <TypographySpan className="text-sm text-muted-foreground">
                مشکلات بیماری
              </TypographySpan>
              <TypographyLarge className="text-base">
                {additionalinitialInfo.medicalConditions}
              </TypographyLarge>
            </div>
            <div className="space-y-1">
              <TypographySpan className="text-sm text-muted-foreground">
                استان
              </TypographySpan>
              <TypographyLarge className="text-base">
                {additionalinitialInfo.province}
              </TypographyLarge>
            </div>
            <div className="space-y-1">
              <TypographySpan className="text-sm text-muted-foreground">
                شهر
              </TypographySpan>
              <TypographyLarge className="text-base">
                {additionalinitialInfo.city}
              </TypographyLarge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdditionalDriverInfoCard;
