import { TableCell, TableRow } from "@/core/components/shadcn/ui/table/table";
import ScheduleRowActions from "./ScheduleRowActions";

export default function ScheduleRow({ day, shift1, shift2, getValue }) {
  return (
    <TableRow>
      <TableCell>{day}</TableCell>
      <TableCell>{getValue(shift1?.start)}</TableCell>
      <TableCell>{getValue(shift1?.end)}</TableCell>
      <TableCell>{getValue(shift2?.start)}</TableCell>
      <TableCell>{getValue(shift2?.end)}</TableCell>

      <TableCell className="flex items-center justify-center gap-2">
        <ScheduleRowActions day={day} schedule={{ day, shift1, shift2 }} />
      </TableCell>
    </TableRow>
  );
}
