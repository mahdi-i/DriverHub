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
import { getGender } from "@/core/utils/getGender";
import { getSortBy } from "@/core/utils/getsortBy";
import { getStatusLabel } from "@/core/utils/getStatusLabel";
import { AppointmentStatus, GenderEnum } from "@driverhub/shared-types";

function HeadBookingDashboardDriver() {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">صفحه</TypographyP>
            <Input type="number" min={1} defaultValue={1} placeholder="صفحه" />
          </div>

          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">لیمیت</TypographyP>
            <Input
              type="number"
              min={1}
              defaultValue={10}
              placeholder="لیمیت"
            />
          </div>

          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">وضعیت</TypographyP>
            <Select defaultValue={AppointmentStatus.PENDING}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={AppointmentStatus.PENDING}>
                  {getStatusLabel(AppointmentStatus.PENDING)}
                </SelectItem>
                <SelectItem value={AppointmentStatus.COMPLETED}>
                  {getStatusLabel(AppointmentStatus.COMPLETED)}
                </SelectItem>
                <SelectItem value={AppointmentStatus.CONFIRMED}>
                  {getStatusLabel(AppointmentStatus.CONFIRMED)}
                </SelectItem>
                <SelectItem value={AppointmentStatus.CANCELLED}>
                  {getStatusLabel(AppointmentStatus.CANCELLED)}
                </SelectItem>
                <SelectItem value={AppointmentStatus.REJECTED}>
                  {getStatusLabel(AppointmentStatus.REJECTED)}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">چیدمان</TypographyP>
            <Select defaultValue={sortBy.ASC}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="چیدمان" />
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
          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">جنسیت</TypographyP>
            <Select defaultValue={GenderEnum.MALE}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="جنسیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={GenderEnum.MALE}>
                  {getGender(GenderEnum.MALE)}
                </SelectItem>
                <SelectItem value={GenderEnum.FEMALE}>
                  {getGender(GenderEnum.FEMALE)}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeadBookingDashboardDriver;
