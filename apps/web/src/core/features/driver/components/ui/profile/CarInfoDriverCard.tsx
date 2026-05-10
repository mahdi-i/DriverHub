import {
  TypographyLarge,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";

import { getLicenseTypeLabel } from "@/core/utils/getLicenseTypeLabel";
import { carData } from "../../../assets/mock/carData";
import CarInfoModal from "./modal/CarInfoModal";

function CarInfoDriverCard() {
  return (
    <Card className="md:w-[70%]  w-full p-2 ">
      <div className="flex items-center mb-4 gap-2 px-2">
        <CardTitle>اطلاعات ماشین</CardTitle>
        <CarInfoModal />
      </div>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            مدل خودرو
          </TypographySpan>
          <TypographyLarge className="text-base">
            {carData.carModel}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            رنگ خودرو
          </TypographySpan>
          <TypographyLarge className="text-base">
            {carData.carColor}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            شماره گواهینامه
          </TypographySpan>
          <TypographyLarge className="text-base">
            {carData.licenseNumber}
          </TypographyLarge>
        </div>
        <div className="space-y-1">
          <TypographySpan className="text-sm text-muted-foreground">
            نوع گواهینامه
          </TypographySpan>
          <TypographyLarge className="text-base">
            {getLicenseTypeLabel(carData.licenseType)}
          </TypographyLarge>
        </div>
        <div className="space-y-1 md:col-span-2">
          <TypographySpan className="text-sm text-muted-foreground">
            سابقه رانندگی
          </TypographySpan>
          <TypographyLarge className="text-base">
            {carData.experienceYears} سال
          </TypographyLarge>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarInfoDriverCard;
