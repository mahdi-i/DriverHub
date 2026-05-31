"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
import { ALL_DAYS } from "../../../assets/mock/allDats";
import { ScheduleData } from "../../../assets/types/scheduleItem";
import ScheduleRow from "./ScheduleRow";

export default function ScheduleTable({
  schedules,
  license,
}: {
  schedules: ScheduleData[];
  license: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>روز</TableHead>
          <TableHead>شروع شیفت ۱</TableHead>
          <TableHead>پایان شیفت ۱</TableHead>
          <TableHead>شروع شیفت ۲</TableHead>
          <TableHead>پایان شیفت ۲</TableHead>
          <TableHead>عملیات</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ALL_DAYS.map((day) => {
          const foundSchedule = schedules.find(
            (item: ScheduleData) => item.dayOfWeek === day,
          );

          return (
            <ScheduleRow
              key={day}
              day={day}
              schedule={foundSchedule || null}
              license={license}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
