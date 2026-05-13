import { sortBy } from "@/core/assets/@types/enum/sortBy";

import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
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
import ModalListWorkSchedule from "./modal/ModalListWorkSchedule";
function HeadScheduleDriver() {
  return (
    <Card>
      <CardContent className="flex-col md:flex md:flex-row justify-between items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
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

          <div className="md:col-span-1 col-span-2">
            <TypographyP className="text-select">جستجو</TypographyP>
            <Input placeholder="جستجو روز مدنظر" />
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:ml-4 w-full md:w-auto flex justify-end">
          <ModalListWorkSchedule />
        </div>
      </CardContent>
    </Card>
  );
}


export default HeadScheduleDriver;
