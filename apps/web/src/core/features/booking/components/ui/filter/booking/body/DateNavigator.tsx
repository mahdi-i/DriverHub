"use client";
import { TypographySmall } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { formatDate } from "@/core/utils/formatDate";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface DateNavigatorProps {
  className?: string;
  onDateChange?: (date: Date) => void;
}

export function DateNavigator({
  className = "",
  onDateChange,
}: DateNavigatorProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentDate, setCurrentDate] = useState(today);

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
    onDateChange?.(nextDay);
  };
  const goToPrevDay = () => {
    if (isSameDay(currentDate, today)) {
      return;
    }

    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
    onDateChange?.(prevDay);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div
      className={`flex items-center gap-2 bg-white border border-border rounded-full p-1  ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevDay}
        disabled={isSameDay(currentDate, today)}
        className="h-8 w-8 rounded-full hover:bg-muted"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <TypographySmall className="px-2 font-medium">
        {formatDate(currentDate.toLocaleDateString())}
      </TypographySmall>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextDay}
        className="h-8 w-8 rounded-full hover:bg-muted"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function DateNavigatorMobile({
  className = "",
  onDateChange,
}: DateNavigatorProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentDate, setCurrentDate] = useState(today);

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
    onDateChange?.(nextDay);
  };
  const goToPrevDay = () => {
    if (isSameDay(currentDate, today)) {
      return;
    }

    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
    onDateChange?.(prevDay);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  return (
    <div
      className={`flex items-center gap-2 bg-white border border-border rounded-full p-1  ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevDay}
        disabled={isSameDay(currentDate, today)}
        className="h-5 w-5 rounded-full hover:bg-muted"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <TypographySmall className="px-1 font-medium">
        {formatDate(currentDate.toLocaleDateString())}
      </TypographySmall>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextDay}
        className="h-5 w-5 rounded-full hover:bg-muted"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
