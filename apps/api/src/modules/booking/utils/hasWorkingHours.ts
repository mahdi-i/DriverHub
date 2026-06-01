import { ScheduleDriver } from '@core/dashboard-driver/modules/schedule-driver/entities/schedule-driver.entity';

export function hasWorkingHours(schedule: ScheduleDriver): boolean {
  return !!(schedule.startTimeFirst && schedule.endTimeFirst);
}
