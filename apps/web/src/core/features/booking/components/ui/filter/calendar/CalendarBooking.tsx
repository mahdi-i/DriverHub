"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/shadcn/ui/popover/popover";
import { useIsMobile } from "@/core/hooks/useIsMobile";
import { CalendarIcon } from "lucide-react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "react-multi-date-picker";

function CalendarBooking({
  valueCalendar,
  setValueCalendar,
  numberMonth,
  label = "تاریخ شروع",
}: {
  valueCalendar: Date | null;
  setValueCalendar: React.Dispatch<React.SetStateAction<Date | null>>;
  numberMonth?: number;
  label?: string;
}) {
  const isMobile = useIsMobile();

  const formattedDate = valueCalendar
    ? new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(valueCalendar)
    : "تاریخ";

  return (
    <div className="md:col-span-4 space-y-1.5">
      <label className="text-select"> {label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`
              w-full h-9 px-3 py-2 text-sm font-normal border rounded-sm shadow-sm
              transition-colors hover:bg-accent hover:text-accent-foreground
              flex items-center justify-between gap-2
              ${!valueCalendar ? "text-muted-foreground" : "text-foreground"}
            `}
          >
            <span>{formattedDate}</span>
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            value={valueCalendar ? new Date(valueCalendar) : null}
            onChange={(dateObj) => {
              if (dateObj) {
                setValueCalendar(dateObj.toDate());
              } else {
                setValueCalendar(null);
              }
            }}
            numberOfMonths={numberMonth ? numberMonth : isMobile ? 1 : 2}
            format="YYYY/MM/DD"
            calendar={persian}
            locale={persian_fa}
            minDate={new Date()}
            className="custom-calendar shadow-md rounded-xl border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CalendarBooking;
