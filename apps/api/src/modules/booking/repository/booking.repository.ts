import { ScheduleDriver } from '@core/dashboard-driver/modules/schedule-driver/entities/schedule-driver.entity';
import { AppointmentStatus } from '@driverhub/shared-types';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getSecondsFromMidnight } from '@shared/utils/seconds-from-midnight.util';
import {
  DataSource,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable({ scope: Scope.REQUEST })
export class BookingRepository extends Repository<Booking> {
  private validationErrors: string[] = [];
  private selectBuilder: SelectQueryBuilder<Booking>;

  constructor(
    @InjectRepository(Booking)
    private readonly repository: Repository<Booking>,
    private readonly dataSource: DataSource,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  resetBuilder(queryRunner: QueryRunner) {
    this.selectBuilder = queryRunner.manager.createQueryBuilder(
      Booking,
      'booking',
    );
  }

  startValidation(): this {
    this.validationErrors = [];
    return this;
  }

  async startTransaction(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    this.resetBuilder(queryRunner);
    return queryRunner;
  }

  async rollbackTransaction(queryRunner: QueryRunner) {
    await queryRunner.rollbackTransaction();
    this.resetBuilder(queryRunner);
  }

  async commitTransaction(queryRunner: QueryRunner) {
    await queryRunner.commitTransaction();
    this.resetBuilder(queryRunner);
  }

  async release(queryRunner: QueryRunner) {
    await queryRunner.release();
    this.resetBuilder(queryRunner);
  }

  async checkWorkSchedule(
    driverId: string,
    targetDate: Date,
    startTime: string,
    endTime: string,
  ): Promise<this> {
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

    const schedule = await this.manager
      .createQueryBuilder()
      .select('ws')
      .from(ScheduleDriver, 'ws')
      .where('ws.driver_id = :driverId', { driverId })
      .andWhere('ws.dayOfWeek = :dayOfWeek', { dayOfWeek: dayOfWeekString })
      .getOne();

    if (!schedule) {
      this.validationErrors.push(
        `راننده برای روز ${targetDate.toLocaleDateString('fa-IR', { weekday: 'long' })} برنامه کاری ندارد.`,
      );
      return this;
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
      this.validationErrors.push(
        'زمان انتخاب شده خارج از ساعات کاری راننده است.',
      );
    }

    return this;
  }

  async checkTimeConflict(
    driverId: string,
    startTime: Date,
    endTime: Date,
    excludeId?: string,
  ): Promise<this> {
    const qb = this.repository
      .createQueryBuilder('booking')
      .where('booking.driver_id = :driverId', { driverId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED],
      })
      .andWhere(
        'booking.startTime < :endTime AND booking.endTime > :startTime',
        {
          startTime,
          endTime,
        },
      );

    if (excludeId) {
      qb.andWhere('booking.id != :id', { id: excludeId });
    }

    const conflict = await qb.getOne();

    if (conflict) {
      this.validationErrors.push('این بازه زمانی قبلاً رزرو شده است.');
    }

    return this;
  }

  validate(): { valid: boolean; errors: string[] } {
    return {
      valid: this.validationErrors.length === 0,
      errors: this.validationErrors,
    };
  }
}
