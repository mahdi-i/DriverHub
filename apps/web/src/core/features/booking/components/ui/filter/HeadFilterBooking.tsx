import {
  TypographyMuted,
  TypographySpan,
} from "@/core/components/custom/ui/typography/Typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { SlidersHorizontal } from "lucide-react";
import { mockBookingDrivers } from "../../../assets/mock/bookingDriver";
import FilterBookingContent from "./booking/filter/FilterBookingContent";
function HeadFilterBooking() {
  return (
    <aside className="hidden lg:block w-[320px] ">
      <Card className="gap-1">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              فیلترها
            </CardTitle>
            <div className="flex items-center gap-2">
              <TypographyMuted>نتایج:</TypographyMuted>
              <TypographySpan className="text-muted-foreground text-sm font-medium">
                {mockBookingDrivers.length} مورد
              </TypographySpan>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 ">
          <FilterBookingContent />
        </CardContent>
      </Card>
    </aside>
  );
}

export default HeadFilterBooking;
