import { sortBy } from "@/core/assets/@types/enum/sortBy";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import { getDayOfWeekLabel } from "@/core/utils/getDayOfWeek";
import { getSortBy } from "@/core/utils/getsortBy";
import { DaysOfWeek } from "@driverhub/shared-types";
import { Edit } from "lucide-react";

function page() {
  return (
    <div>
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-3">
            <div>
              <TypographyP className="text-select">روز هفته</TypographyP>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="روزهای هفته" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DaysOfWeek.SATURDAY}>
                    {getDayOfWeekLabel(DaysOfWeek.SATURDAY)}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <TypographyP className="text-select">نوع چیدمان</TypographyP>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="چیدمان روز ها" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={sortBy.ASC}>
                    {getSortBy(sortBy.ASC)}
                  </SelectItem>
                  <SelectItem value={sortBy.DESC}>
                    {getSortBy(sortBy.DESC)}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <TypographyP className="text-select">جستجو</TypographyP>
              <Input placeholder="جستجو روز مدنظر" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">مشاهده لیست</Button>
            <Button className="flex items-center">
              <Edit size={16} />
              ویرایش
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
