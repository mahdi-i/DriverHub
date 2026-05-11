import { DaysOfWeek } from "@driverhub/shared-types";

export function getDayOfWeekLabel(day: DaysOfWeek): string {
  switch (day) {
    case DaysOfWeek.SATURDAY:
      return "شنبه";
    case DaysOfWeek.SUNDAY:
      return "یکشنبه";
    case DaysOfWeek.MONDAY:
      return "دو شنبه";
    case DaysOfWeek.TUESDAY:
      return "سه‌ شنبه";
    case DaysOfWeek.WEDNESDAY:
      return "چهار شنبه";
    case DaysOfWeek.THURSDAY:
      return "پنج‌ شنبه";
    case DaysOfWeek.FRIDAY:
      return "جمعه";
    default:
      return "نامشخص";
  }
}
