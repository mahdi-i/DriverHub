import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";

function ScheduleTableSkeleton() {
  const days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-muted-foreground">روز</TableHead>
          <TableHead className="text-muted-foreground">شروع شیفت ۱</TableHead>
          <TableHead className="text-muted-foreground">پایان شیفت ۱</TableHead>
          <TableHead className="text-muted-foreground">شروع شیفت ۲</TableHead>
          <TableHead className="text-muted-foreground">پایان شیفت ۲</TableHead>
          <TableHead className="text-muted-foreground">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {days.map((_, index) => (
          <TableRow key={index} className="hover:bg-transparent">
            <TableCell>
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </TableCell>

            {[1, 2, 3, 4].map((_, timeIndex) => (
              <TableCell key={timeIndex}>
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              </TableCell>
            ))}

            <TableCell className="flex items-center justify-center gap-2">
              <div className="h-8 w-8 bg-muted rounded animate-pulse" />
              <div className="h-8 w-8 bg-muted rounded animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ScheduleTableSkeleton;
