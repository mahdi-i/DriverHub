import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
import ScheduleRow from "./ScheduleRow";

const getValue = (value?: string) => value ?? "ست نشده";

export default function ScheduleTable({ schedules }) {
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
        {schedules.map((item) => (
          <ScheduleRow
            key={item.day}
            day={item.day}
            shift1={item.shift1}
            shift2={item.shift2}
            getValue={getValue}
          />
        ))}
      </TableBody>
    </Table>
  );
}
