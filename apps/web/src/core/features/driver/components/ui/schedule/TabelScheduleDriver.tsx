import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { DaysOfWeek } from "@driverhub/shared-types";
import { Suspense } from "react";
import { ScheduleData } from "../../../assets/types/scheduleItem";
import ScheduleTable from "./ScheduleTable";
import ScheduleTableSkeleton from "./skeleton/ScheduleTableSkeleton";
interface RawScheduleItem {
  id: string;
  dayOfWeek: DaysOfWeek;
  startTimeFirst: string;
  endTimeFirst: string;
  startTimeSecond: string;
  endTimeSecond: string;
}

export default async function TabelScheduleDriver({
  license,
}: {
  license: string;
}) {
  let schedules: ScheduleData[] = [];

  const res = await fetch(`${BASE_URL}/schedule-driver/filter-my-schedule`, {
    headers: {
      Authorization: `Bearer ${license}`,
    },
    next: { tags: [`schedule-driver`] },
  });

  if (res.ok) {
    const data = await res.json();
    const rawData: RawScheduleItem[] = data.data || [];
    schedules = rawData.map((item: RawScheduleItem) => ({
      id: item.id,
      dayOfWeek: item.dayOfWeek,
      startTimeFirst: item.startTimeFirst,
      endTimeFirst: item.endTimeFirst,
      startTimeSecond: item.startTimeSecond,
      endTimeSecond: item.endTimeSecond,
    }));
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>جدول روزهای کاری</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ScheduleTableSkeleton />}>
          <ScheduleTable schedules={schedules} license={license} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
