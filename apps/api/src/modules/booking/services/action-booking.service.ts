import { AppointmentStatus } from '@driverhub/shared-types';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class ActionBookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async confirm(bookingId: string, driverId: string, note?: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, driver: { id: driverId } },
    });

    if (!booking) throw new NotFoundException('درخواست یافت نشد');
    if (booking.status !== AppointmentStatus.PENDING) {
      throw new BadRequestException('این درخواست در انتظار تایید نیست');
    }

    booking.status = AppointmentStatus.CONFIRMED;
    booking.confirmedAt = new Date();
    if (note) booking.note = note;

    return this.bookingRepo.save(booking);
  }

  async reject(bookingId: string, driverId: string, reason: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, driver: { id: driverId } },
    });

    if (!booking) throw new NotFoundException('درخواست یافت نشد');
    if (booking.status !== AppointmentStatus.PENDING) {
      throw new BadRequestException('این درخواست در انتظار تایید نیست');
    }

    booking.status = AppointmentStatus.REJECTED;
    booking.note = reason;

    return this.bookingRepo.save(booking);
  }

  async cancel(bookingId: string, userId: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['driver', 'student'],
    });

    if (!booking) throw new NotFoundException('درخواست یافت نشد');

    const isOwner = booking.student?.id === userId;
    const isDriver = booking.driver?.id === userId;

    if (!isOwner && !isDriver) {
      throw new ForbiddenException('شما دسترسی لغو این درخواست را ندارید');
    }

    if (
      booking.status !== AppointmentStatus.PENDING &&
      booking.status !== AppointmentStatus.CONFIRMED
    ) {
      throw new BadRequestException('امکان لغو این درخواست وجود ندارد');
    }

    booking.status = AppointmentStatus.CANCELLED;
    return this.bookingRepo.save(booking);
  }

  async complete(bookingId: string, driverId: string, score?: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, driver: { id: driverId } },
    });

    if (!booking) throw new NotFoundException('نوبت یافت نشد');
    if (booking.status !== AppointmentStatus.CONFIRMED) {
      throw new BadRequestException('فقط نوبت‌های تایید شده قابل تکمیل هستند');
    }

    booking.status = AppointmentStatus.COMPLETED;
    if (score) booking.score = score;

    return this.bookingRepo.save(booking);
  }
}
