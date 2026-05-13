import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
function HeadTabelBookingDashboard() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12.5">ردیف</TableHead>
        <TableHead>روز</TableHead>
        <TableHead>تاریخ و ساعت</TableHead>
        <TableHead>استاد</TableHead>
        <TableHead>جنسیت</TableHead>
        <TableHead>استان / شهر</TableHead>
        <TableHead>وضعیت</TableHead>
        <TableHead className="w-12.5"></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default HeadTabelBookingDashboard;
