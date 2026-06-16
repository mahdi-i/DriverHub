"use client";
import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/core/components/custom/ui/typography/Typography";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { TimeSlot } from "@/core/features/booking/assets/types/timeSlot";
import { calculateDurationBooking } from "@/core/features/booking/utils/calculateDurationBooking";
import { calculateTotalFreeHours } from "@/core/features/booking/utils/calculateTotalFreeHours";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DateNavigator,
  DateNavigatorMobile,
} from "../../filter/booking/body/DateNavigator";

function FreeTimeDriver({ license, driverId }) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      setLoading(true);
      setError(null);

      const formattedDate = selectedDate.toISOString().split("T")[0];
      const dayName = selectedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      try {
        const response = await fetch(
          `${BASE_URL}/booking/drivers-schedule/${driverId}/${dayName}?date=${formattedDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${license}`,
            },
          },
        );

        if (!response.ok) {
          return toast.error("خطا در دریافت اطلاعات");
        }

        const data = await response.json();

        if (isMounted) {
          setTimeSlots(data);
        }
      } catch {
        if (isMounted) {
          setError("مشکلی در دریافت زمان‌ها پیش آمد");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [selectedDate, driverId, license]);

  function handleDateChange(newDate: Date) {
    setSelectedDate(newDate);
  }

  function getStatusText(status: string) {
    return status === "FREE" ? "آزاد" : "پر";
  }

  return (
    <Card className="overflow-hidden border-0 shadow-sm py-0">
      <CardContent className="p-0">
        <div className="border-b p-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <TypographyH4 className="text-base font-semibold">
                زمان‌ های آزاد راننده
              </TypographyH4>
            </div>
            <div className="flex items-center gap-2">
              <div className="items-center  md:flex hidden">
                <DateNavigator onDateChange={handleDateChange} />
              </div>
              <div className="items-center  md:hidden flex">
                <DateNavigatorMobile onDateChange={handleDateChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <TypographyP className="text-debg-destructive">
                {error}
              </TypographyP>
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="text-center py-12">
              <TypographyMuted>
                برنامه‌ای برای این روز ثبت نشده است
              </TypographyMuted>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all hover:shadow-md ${
                    slot.status === "FREE"
                      ? "bg-linear-to-br from-green-50 to-green-100/50 border-green-200 dark:from-green-950/20 dark:to-green-900/10"
                      : "bg-linear-to-br from-red-50 to-red-100/50 border-red-200 dark:from-red-950/20 dark:to-red-900/10"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock
                          className={`h-4 w-4 ${
                            slot.status === "FREE"
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        />
                        <span className="text-sm font-mono font-medium">
                          {slot.start} - {slot.end}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          slot.status === "FREE"
                            ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {slot.status === "FREE" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        <span>{getStatusText(slot.status)}</span>
                      </div>
                    </div>

                    <div className="mt-3 h-1 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          slot.status === "FREE"
                            ? "bg-success"
                            : "bg-destructive"
                        }`}
                        style={{ width: "100%" }}
                      />
                    </div>

                    <TypographyMuted className="text-xs mt-2">
                      مدت زمان: {calculateDurationBooking(slot.start, slot.end)}
                    </TypographyMuted>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && timeSlots.length > 0 && (
            <div className="mt-5 pt-4 border-t flex justify-between items-center">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <TypographyMuted className="text-xs">
                    آزاد: {timeSlots.filter((s) => s.status === "FREE").length}{" "}
                    بازه
                  </TypographyMuted>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <TypographyMuted className="text-xs">
                    پر: {timeSlots.filter((s) => s.status === "BUSY").length}{" "}
                    بازه
                  </TypographyMuted>
                </div>
              </div>
              <TypographyMuted className="text-xs">
                {calculateTotalFreeHours(timeSlots)} ساعت آزاد
              </TypographyMuted>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FreeTimeDriver;
