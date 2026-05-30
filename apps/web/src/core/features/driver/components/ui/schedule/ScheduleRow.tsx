"use client";

import { TableCell, TableRow } from "@/core/components/shadcn/ui/table/table";
import { getDayOfWeekLabel } from "@/core/utils/getDayOfWeek";
import { DaysOfWeek } from "@driverhub/shared-types";
import { ScheduleData } from "../../../assets/types/scheduleItem";
import ScheduleRowActions from "./ScheduleRowActions";

export default function ScheduleRow({
  day,
  schedule,
  license,
}: {
  day: DaysOfWeek;
  schedule: ScheduleData;
  license: string;
}) {
  const getValue = (value?: string) => value ?? "ست نشده";

  const isSet = !!schedule;
  const cellClass = isSet ? "" : "bg-black/3 rounded-md ";
  console.log(schedule, "asidhfsiojfi");
  return (
    <TableRow>
      <TableCell className="rounded-md">{getDayOfWeekLabel(day)}</TableCell>

      <TableCell className={cellClass}>
        {getValue(schedule?.startTimeFirst)}
      </TableCell>
      <TableCell className={cellClass}>
        {getValue(schedule?.endTimeFirst)}
      </TableCell>
      <TableCell className={cellClass}>
        {getValue(schedule?.startTimeSecond)}
      </TableCell>
      <TableCell className={cellClass}>
        {getValue(schedule?.endTimeSecond)}
      </TableCell>

      <TableCell className="flex items-center justify-center gap-2">
        <ScheduleRowActions
          day={day}
          schedule={schedule}
          license={license}
          selectId={schedule?.id}
          isSet={isSet}
        />
      </TableCell>
    </TableRow>
  );
}
