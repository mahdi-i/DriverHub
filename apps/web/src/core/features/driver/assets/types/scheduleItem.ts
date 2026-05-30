import { DaysOfWeek } from "@driverhub/shared-types";

export interface ScheduleItem {
  id: string;
  dayOfWeek: string;
  shift1?: {
    start: string;
    end: string;
  };
  shift2?: {
    start: string;
    end: string;
  };
}

export interface ScheduleData {
  id: string;
  dayOfWeek: DaysOfWeek;
  startTimeFirst: string;
  endTimeFirst: string;
  startTimeSecond: string;
  endTimeSecond: string;
}
