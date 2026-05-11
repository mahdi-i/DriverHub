"use client";
import { sortBy } from "@/core/assets/@types/enum/sortBy";
import Modal from "@/core/components/custom/ui/modal/Modal";
import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/shadcn/ui/card/card";
import { Input } from "@/core/components/shadcn/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/shadcn/ui/select/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/shadcn/ui/table/table";
import { getDayOfWeekLabel } from "@/core/utils/getDayOfWeek";
import { getSortBy } from "@/core/utils/getsortBy";
import { DaysOfWeek } from "@driverhub/shared-types";
import { useState } from "react";
import { toast } from "sonner";
const schedules = [
  {
    day: "شنبه",
    shift1: { start: "08:00", end: "12:00" },
    shift2: { start: "16:00", end: "20:00" },
  },
  {
    day: "یکشنبه",
    shift1: { start: "09:00", end: "13:00" },
    shift2: { start: "17:00", end: "21:00" },
  },
  {
    day: "دوشنبه",
    shift1: { start: "10:00", end: "15:00" },
  },
  {
    day: "سه‌شنبه",
    shift1: { start: "08:30", end: "14:30" },
    shift2: { start: "15:30", end: "19:30" },
  },
  {
    day: "چهارشنبه",
    shift1: { start: "09:00", end: "12:30" },
  },
  {
    day: "پنجشنبه",
    shift1: { start: "08:00", end: "13:00" },
    shift2: { start: "14:00", end: "18:00" },
  },
  {
    day: "جمعه",
  },
];
const getValue = (value?: string) => value ?? "ست نشده";

const handleDelete = (id: string) => {
  console.log(`Delete clicked for schedule with id: ${id}`);

  toast.error(`آیتم با شناسه ${id} برای حذف انتخاب شد.`);
};

const handleEdit = (schedule) => {
  console.log(`Edit clicked for schedule:`, schedule);

  toast.error(`آیتم ${schedule.day} برای ویرایش انتخاب شد.`);
};
function page() {
  const [open, setopen] = useState(false);
  const [open1, setopen1] = useState(false);
  const [open2num, setopen2num] = useState(false);
  return (
    <div className="space-y-3.5">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-3">
            <div>
              <TypographyP className="text-select">روز هفته</TypographyP>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="روزهای هفته" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DaysOfWeek.SATURDAY}>
                    {getDayOfWeekLabel(DaysOfWeek.SATURDAY)}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <TypographyP className="text-select">نوع چیدمان</TypographyP>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="چیدمان روز ها" />
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

            <div>
              <TypographyP className="text-select">جستجو</TypographyP>
              <Input placeholder="جستجو روز مدنظر" />
            </div>
          </div>
          <Modal
            open={open}
            onOpenChange={setopen}
            title="مشاهده لیست"
            trigger={<Button variant="secondary">مشاهده لیست</Button>}
          >
            123
          </Modal>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>جدول روزهای کاری</CardTitle>
        </CardHeader>

        <CardContent>
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
                <TableRow key={item.day}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{getValue(item.shift1?.start)}</TableCell>
                  <TableCell>{getValue(item.shift1?.end)}</TableCell>
                  <TableCell>{getValue(item.shift2?.start)}</TableCell>
                  <TableCell>{getValue(item.shift2?.end)}</TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    <Modal
                      open={open1}
                      onOpenChange={setopen1}
                      title="مشاهده لیست"
                      trigger={
                        <Button
                          variant="secondary"
                          size="icon-sm"
                          className="bg-white border border-secondary"
                          onClick={() => handleEdit(item)}
                        >
                          ✏️
                        </Button>
                      }
                    >
                      123
                    </Modal>
                    <Modal
                      open={open2num}
                      onOpenChange={setopen2num}
                      title="مشاهده لیست"
                      trigger={
                        <Button
                          variant="destructive"
                          size="icon-sm"
                          className="bg-white border border-destructive"
                          onClick={() => handleDelete(item.day)}
                        >
                          🗑️
                        </Button>
                      }
                    >
                      123
                    </Modal>
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

export default page;
