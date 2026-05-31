import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";

function BookingTableSkeleton() {
  return (
    <div className="mt-5 w-full">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12.5 text-muted-foreground">
                  ردیف
                </TableHead>
                <TableHead className="text-muted-foreground">
                  نام هنرجو
                </TableHead>
                <TableHead className="text-muted-foreground">سن</TableHead>
                <TableHead className="text-muted-foreground">جنسیت</TableHead>
                <TableHead className="text-muted-foreground">
                  استان / شهر
                </TableHead>
                <TableHead className="text-muted-foreground">
                  تاریخ و ساعت
                </TableHead>
                <TableHead className="text-muted-foreground">وضعیت</TableHead>
                <TableHead className="w-12.5 text-muted-foreground"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="hover:bg-transparent">
                  <TableCell>
                    <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-muted rounded-full animate-pulse" />
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
export default BookingTableSkeleton;
