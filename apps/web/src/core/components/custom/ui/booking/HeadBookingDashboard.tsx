"use client";
import {
  DEFAULT_GENDER,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT,
  DEFAULT_STATUS,
} from "@/core/assets/@types/defaultParamsTs";
import { SortEnumBy } from "@/core/assets/@types/enum/sortBy";
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
import { useRouter, useSearchParams } from "next/navigation";

function HeadBookingDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || DEFAULT_PAGE;
  const limit = searchParams.get("limit") || DEFAULT_LIMIT;
  const sortBy = searchParams.get("sortBy") || DEFAULT_SORT;
  const status = searchParams.get("filter.status") || DEFAULT_STATUS;
  const gender = searchParams.get("filter.student.gender") || DEFAULT_GENDER;

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  }
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">صفحه</TypographyP>
            <Input
              type="number"
              min={1}
              value={page}
              onChange={(e) => updateParam("page", e.target.value)}
              placeholder="صفحه"
            />
          </div>
          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">لیمیت</TypographyP>
            <Input
              type="number"
              min={1}
              value={limit}
              onChange={(e) => updateParam("limit", e.target.value)}
              placeholder="لیمیت"
            />
          </div>
          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">وضعیت</TypographyP>
            <Select
              value={status}
              onValueChange={(val) => updateParam("filter.status", val)}
            >
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
            <Select
              value={sortBy}
              onValueChange={(val) => updateParam("sortBy", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="چیدمان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASC">{getSortBy(SortEnumBy.ASC)}</SelectItem>
                <SelectItem value="DESC">
                  {getSortBy(SortEnumBy.DESC)}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <TypographyP className="text-sm font-medium">جنسیت</TypographyP>
            <Select
              value={gender}
              onValueChange={(val) => updateParam("filter.student.gender", val)}
            >
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
export default HeadBookingDashboard;
