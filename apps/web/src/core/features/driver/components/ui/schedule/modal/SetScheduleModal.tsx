"use client";

import Modal from "@/core/components/custom/ui/modal/Modal";
import { TypographyH3 } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { ScheduleItem } from "@/core/features/driver/assets/types/scheduleItem";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { revalidateChache } from "@/core/lib/revalidate/Revalidate";
import { getDayOfWeekLabel } from "@/core/utils/getDayOfWeek";
import { DaysOfWeek } from "@driverhub/shared-types";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SetScheduleModal({
  day,
  schedule,
  license,
}: {
  day: DaysOfWeek;
  schedule: ScheduleItem;
  license: string;
  selectId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [twoShifts, setTwoShifts] = useState(false);

  const [shift1Start, setShift1Start] = useState("");
  const [shift1End, setShift1End] = useState("");

  const [shift2Start, setShift2Start] = useState("");
  const [shift2End, setShift2End] = useState("");

  useEffect(() => {
    if (isModalOpen && schedule) {
      if (schedule.shift1) {
        setShift1Start(schedule.shift1.start || "");
        setShift1End(schedule.shift1.end || "");
      } else {
        setShift1Start("");
        setShift1End("");
      }

      if (schedule.shift2) {
        setTwoShifts(true);
        setShift2Start(schedule.shift2.start || "");
        setShift2End(schedule.shift2.end || "");
      } else {
        setTwoShifts(false);
        setShift2Start("");
        setShift2End("");
      }
    }
  }, [isModalOpen, schedule]);

  async function handleEdit() {
    if (!shift1Start || !shift1End) {
      toast.error("لطفاً زمان شروع و پایان شیفت اول را وارد کنید.");
      return;
    }
    const payload = {
      startTimeFirst: shift1Start,
      endTimeFirst: shift1End,
      startTimeSecond: twoShifts ? shift2Start : null,
      endTimeSecond: twoShifts ? shift2End : null,
      dayOfWeek: [day as DaysOfWeek],
    };
    console.log(payload, "pa");
    try {
      const res = await fetch(`${BASE_URL}/schedule-driver/set-schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${license}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        return toast.error(data.errors || "مشکل پیش آمد");
      }
      setIsModalOpen(false);
      toast.success(data.message || `تغییرات روز ${day} با موفقیت ذخیره شد.`);
      await revalidateChache("1");
    } catch (error) {
      toast.error(error.errors || "مشکل پیش آمد");
    }
  }

  return (
    <Modal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title={`تعیین روز ${getDayOfWeekLabel(day)}`}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className=" gap-1 text-black/80 border-primary"
        >
          <CalendarDays className="h-3 w-3" />
          {"ست کردن"}
        </Button>
      }
      hideDefaultFooter={true}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
        className="space-y-6 p-4"
      >
        <div className="space-y-4">
          <TypographyH3 className="text-lg font-medium text-gray-900">
            شیفت اول
          </TypographyH3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="shift1-start"
                type="time"
                label="شروع"
                value={shift1Start}
                onChange={(e) => setShift1Start(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="shift1-end"
                label="پایان"
                type="time"
                value={shift1End}
                onChange={(e) => setShift1End(e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="checkbox"
            id="two-shifts"
            checked={twoShifts}
            onChange={(e) => setTwoShifts(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="two-shifts"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            افزودن شیفت دوم
          </label>
        </div>

        {twoShifts && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <TypographyH3 className="text-lg font-medium text-gray-900">
              شیفت دوم
            </TypographyH3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  id="shift2-start"
                  type="time"
                  label="شروع"
                  value={shift2Start}
                  onChange={(e) => setShift2Start(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="shift2-end"
                  type="time"
                  label="پایان"
                  value={shift2End}
                  onChange={(e) => setShift2End(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-around space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="w-60"
          >
            انصراف
          </Button>
          <Button type="submit" className="w-60">
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Modal>
  );
}
