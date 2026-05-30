import { DaysOfWeek } from "@driverhub/shared-types";

export const schedules = [
  {
    id: "fe335b0b-8a8c-4e55-ad8e-a736a54cbd68",
    day: DaysOfWeek.SATURDAY,
    shift1: { start: "08:00", end: "12:00" },
    shift2: { start: "16:00", end: "20:00" },
  },
  {
    id: "fe335b0b-8a8c-4e55-ad8e-a736a54cbd65",
    day: DaysOfWeek.SUNDAY,
    shift1: { start: "09:00", end: "13:00" },
    shift2: { start: "17:00", end: "21:00" },
  },
  {
    id: "fe335b0b-8a8c-4e55-ad8e-a736a54cbd622",
    day: DaysOfWeek.MONDAY,
    shift1: { start: "10:00", end: "15:00" },
  },
  {
    id: "4",
    day: DaysOfWeek.TUESDAY,
    shift1: { start: "08:30", end: "14:30" },
    shift2: { start: "15:30", end: "19:30" },
  },
  {
    id: "5",
    day: DaysOfWeek.WEDNESDAY,
    shift1: { start: "09:00", end: "12:30" },
  },
  {
    id: "6",
    day: DaysOfWeek.THURSDAY,
    shift1: { start: "08:00", end: "13:00" },
    shift2: { start: "14:00", end: "18:00" },
  },
  {
    id: "7",
    day: DaysOfWeek.FRIDAY,
  },
];
