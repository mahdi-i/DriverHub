import {
  TypographyH4,
  TypographyLarge,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";

import { ProfileDriverTs } from "../../../assets/types/profileDriverTs";
import AdditionalModalDriverInfoCard from "./modal/AdditionalModalDriverInfoCard";

function ShowInfoDriverP({
  data,
  license,
}: {
  data: ProfileDriverTs;
  license: string;
}) {
  return (
    <div className="w-full md:w-2/3">
      <div className="flex items-center gap-2 mb-5">
        <TypographyH4>اطلاعات تکمیلی</TypographyH4>
        <AdditionalModalDriverInfoCard token={license} data={data} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            سن
          </TypographySpan>
          <TypographyLarge className="text-base">
            {data.age || "-"}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            کد ملی
          </TypographySpan>
          <TypographyLarge className="text-base">
            {data.nationalCode || "-"}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            دارای عینک
          </TypographySpan>
          <TypographyLarge className="text-base">
            {data.hasGlasses ? "بله" : "خیر"}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            مشکلات بیماری
          </TypographySpan>
          <TypographyLarge className="text-base">
            {data.medicalConditions || "-"}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            استان
          </TypographySpan>
          <TypographyLarge className="text-base">
            {data.address || "-"}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            شهر
          </TypographySpan>
          <TypographyLarge className="text-base">
            {data.city || "-"}
          </TypographyLarge>
        </div>
      </div>
    </div>
  );
}

export default ShowInfoDriverP;
