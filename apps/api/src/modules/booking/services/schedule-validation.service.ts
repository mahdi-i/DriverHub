import { ScheduleDriver } from '@core/dashboard-driver/modules/schedule-driver/entities/schedule-driver.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import { getSecondsFromMidnight } from '@shared/utils/seconds-from-midnight.util';
import { EntityManager, Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class ScheduleValidationService {
  constructor(
    @InjectRepository(ScheduleDriver)
    private scheduleRepo: Repository<ScheduleDriver>,
  ) {}
  async checkTimeConflict(
    driverId: string,
    newStart: Date,
    newEnd: Date,
    entityManager: EntityManager,
  ): Promise<boolean> {
    const queryBuilder = entityManager
      .createQueryBuilder()
      .select('1')
      .from(Booking, 'booking')
      .where('booking.driver_id = :driverId', { driverId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED],
      })
      .andWhere('booking.start_time < :newEnd', {
        newEnd: newEnd.toISOString(),
      })
      .andWhere('booking.end_time > :newStart', {
        newStart: newStart.toISOString(),
      });

    const count = await queryBuilder.getCount();
    return count > 0;
  }
  async checkWorkSchedule(
    driverId: string,
    targetDate: Date,
    startTime: Date,
    endTime: Date,
    entityManager: EntityManager,
  ): Promise<void> {
    const dayOfWeekInt = targetDate.getDay();
    const dayNames = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const dayOfWeekString = dayNames[dayOfWeekInt];
    const schedule = await entityManager
      .createQueryBuilder()
      .select('ws')
      .from(ScheduleDriver, 'ws')
      .where('ws.driver_id = :driverId', { driverId })
      .andWhere('ws.dayOfWeek = :dayOfWeek', { dayOfWeek: dayOfWeekString })
      .getOne();

    if (!schedule) {
      throw new BadRequestException(
        `راننده برای روز ${targetDate.toLocaleDateString('fa-IR', { weekday: 'long' })} برنامه کاری ندارد.`,
      );
    }

    const startSeconds = getSecondsFromMidnight(startTime);
    const endSeconds = getSecondsFromMidnight(endTime);

    let isInsideShift = false;

    if (schedule.startTimeFirst && schedule.endTimeFirst) {
      const s1Start = getSecondsFromMidnight(schedule.startTimeFirst);
      const s1End = getSecondsFromMidnight(schedule.endTimeFirst);

      if (startSeconds >= s1Start && endSeconds <= s1End) {
        isInsideShift = true;
      }
    }

    if (!isInsideShift && schedule.startTimeSecond && schedule.endTimeSecond) {
      const s2Start = getSecondsFromMidnight(schedule.startTimeSecond);
      const s2End = getSecondsFromMidnight(schedule.endTimeSecond);

      if (startSeconds >= s2Start && endSeconds <= s2End) {
        isInsideShift = true;
      }
    }

    if (!isInsideShift) {
      throw new BadRequestException(
        'زمان انتخاب شده خارج از ساعات کاری راننده است.',
      );
    }
  }
}
