import { ScheduleDriver } from '@core/dashboard-driver/modules/schedule-driver/entities/schedule-driver.entity';
import { AppointmentStatus, DaysOfWeek } from '@driverhub/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { hasWorkingHours } from '../utils/hasWorkingHours';

@Injectable()
export class GetFreeSlot {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(ScheduleDriver)
    private scheduleRepo: Repository<ScheduleDriver>,
  ) {}

  async getFreeBusySlots(
    driverId: string,
    dayOfWeek: DaysOfWeek,
    date: Date,
  ): Promise<{ start: string; end: string; status: 'FREE' | 'BUSY' }[]> {
    // chking for exsit day for driver id
    const schedule = await this.findWorkSchedule(driverId, dayOfWeek);
    // send error if not exsit day of schedule
    if (!schedule || !hasWorkingHours(schedule)) {
      return [];
    }

    const appointments = await this.findDriverAppointments(driverId, date);

    const result = this.calculateFreeBusySlots(schedule, appointments, date);

    return this.convertSlotsToIranTime(result);
  }

  private async findDriverAppointments(
    driverId: string,
    date: Date,
  ): Promise<Booking[]> {
    // get date
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));

    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    const result = await this.bookingRepo.find({
      where: {
        driver: { id: driverId },
        startTime: Between(startOfDay, endOfDay),
        status: In([AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED]),
      },
      relations: ['driver'],
      order: { startTime: 'ASC' },
    });

    return result;
  }
  private async findWorkSchedule(
    driverId: string,
    dayOfWeek: DaysOfWeek,
  ): Promise<ScheduleDriver | null> {
    return await this.scheduleRepo.findOne({
      where: {
        driver: { id: driverId },
        dayOfWeek: dayOfWeek,
      },
      relations: ['driver'],
    });
  }
  private calculateFreeBusySlots(
    schedule: ScheduleDriver,
    appointments: Booking[],
    date: Date,
  ): { start: string; end: string; status: 'FREE' | 'BUSY' }[] {
    const workingHours = this.buildWorkingHours(schedule, date);

    const appointmentSlots = this.buildAppointmentSlots(appointments);

    return this.generateTimeSlots(workingHours, appointmentSlots);
  }

  private buildWorkingHours(
    schedule: ScheduleDriver,
    date: Date,
  ): { start: Date; end: Date }[] {
    const periods: { start: Date; end: Date }[] = [];

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (schedule.startTimeFirst && schedule.endTimeFirst) {
      const [startHour, startMinute] = this.parseTimeString(
        schedule.startTimeFirst,
      );
      const [endHour, endMinute] = this.parseTimeString(schedule.endTimeFirst);

      periods.push({
        start: new Date(Date.UTC(year, month, day, startHour, startMinute, 0)),
        end: new Date(Date.UTC(year, month, day, endHour, endMinute, 0)),
      });
    }

    if (schedule.startTimeSecond && schedule.endTimeSecond) {
      const [startHour, startMinute] = this.parseTimeString(
        schedule.startTimeSecond,
      );
      const [endHour, endMinute] = this.parseTimeString(schedule.endTimeSecond);

      periods.push({
        start: new Date(Date.UTC(year, month, day, startHour, startMinute, 0)),
        end: new Date(Date.UTC(year, month, day, endHour, endMinute, 0)),
      });
    }

    return periods.sort((a, b) => a.start.getTime() - b.start.getTime());
  }
  private parseTimeString(time: Date | string): [number, number] {
    if (typeof time === 'string') {
      const [hours, minutes] = time.split(':').map(Number);
      return [hours, minutes];
    } else {
      return [time.getHours(), time.getMinutes()];
    }
  }
  private buildAppointmentSlots(
    appointments: Booking[],
  ): { start: Date; end: Date }[] {
    return appointments
      .map((appointment) => ({
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime),
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  private generateTimeSlots(
    workingPeriods: { start: Date; end: Date }[],
    appointments: { start: Date; end: Date }[],
  ): { start: string; end: string; status: 'FREE' | 'BUSY' }[] {
    const allSlots: { start: string; end: string; status: 'FREE' | 'BUSY' }[] =
      [];

    for (const workingPeriod of workingPeriods) {
      const periodSlots = this.generateSlotsForPeriod(
        workingPeriod,
        appointments,
      );
      allSlots.push(...periodSlots);
    }

    return this.mergeAdjacentSlots(allSlots);
  }

  private generateSlotsForPeriod(
    workingPeriod: { start: Date; end: Date },
    appointments: { start: Date; end: Date }[],
  ): { start: string; end: string; status: 'FREE' | 'BUSY' }[] {
    const slots: { start: string; end: string; status: 'FREE' | 'BUSY' }[] = [];
    let currentTime = new Date(workingPeriod.start);

    for (const appointment of appointments) {
      if (
        appointment.end.getTime() <= currentTime.getTime() ||
        appointment.start.getTime() >= workingPeriod.end.getTime()
      ) {
        continue;
      }

      const appointmentStart = new Date(
        Math.max(appointment.start.getTime(), currentTime.getTime()),
      );
      const appointmentEnd = new Date(
        Math.min(appointment.end.getTime(), workingPeriod.end.getTime()),
      );

      if (currentTime.getTime() < appointmentStart.getTime()) {
        slots.push({
          start: this.formatTime(currentTime),
          end: this.formatTime(appointmentStart),
          status: 'FREE',
        });
      }

      if (appointmentStart.getTime() < appointmentEnd.getTime()) {
        slots.push({
          start: this.formatTime(appointmentStart),
          end: this.formatTime(appointmentEnd),
          status: 'BUSY',
        });
      }

      currentTime = appointmentEnd;

      if (currentTime.getTime() >= workingPeriod.end.getTime()) {
        break;
      }
    }

    if (currentTime.getTime() < workingPeriod.end.getTime()) {
      slots.push({
        start: this.formatTime(currentTime),
        end: this.formatTime(workingPeriod.end),
        status: 'FREE',
      });
    }

    return slots;
  }
  private formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }
  private convertSlotsToIranTime(
    slots: { start: string; end: string; status: 'FREE' | 'BUSY' }[],
  ): { start: string; end: string; status: 'FREE' | 'BUSY' }[] {
    return slots.map((slot) => ({
      start: this.convertTimeToIran(slot.start),
      end: this.convertTimeToIran(slot.end),
      status: slot.status,
    }));
  }

  private convertTimeToIran(timeStr: string): string {
    const [hours, minutes] = timeStr.split(':').map(Number);

    let iranHours = hours + 3;
    let iranMinutes = minutes + 30;

    if (iranMinutes >= 60) {
      iranMinutes -= 60;
      iranHours++;
    }

    iranHours = iranHours % 24;

    return `${iranHours.toString().padStart(2, '0')}:${iranMinutes.toString().padStart(2, '0')}`;
  }
  private mergeAdjacentSlots(
    slots: { start: string; end: string; status: 'FREE' | 'BUSY' }[],
  ): { start: string; end: string; status: 'FREE' | 'BUSY' }[] {
    if (slots.length <= 1) return slots;

    const merged = [slots[0]];

    for (let i = 1; i < slots.length; i++) {
      const current = slots[i];
      const last = merged[merged.length - 1];

      if (last.status === current.status && last.end === current.start) {
        last.end = current.end;
      } else {
        merged.push(current);
      }
    }

    return merged;
  }
}
