import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { AppointmentStatus } from '@driverhub/shared-types';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { Booking } from '../entities/booking.entity';
import { BookingRepository } from '../repository/booking.repository';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Driver)
    private driverRepo: Repository<Driver>,
    private readonly bookingRepository: BookingRepository,
  ) {}

  async create(dto: CreateBookingDto, traineeId: string) {
    const { driverId, bookingDate, startTime, endTime, message } = dto;

    const startDateTimeStr = `${bookingDate}T${startTime}:00.000Z`;
    const endDateTimeStr = `${bookingDate}T${endTime}:00.000Z`;
    const start = new Date(startDateTimeStr);
    const end = new Date(endDateTimeStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      throw new BadRequestException('فرمت تاریخ یا زمان نامعتبر است.');
    }

    const queryRunner = await this.bookingRepository.startTransaction();
    try {
      await this.bookingRepository.startValidation();

      await this.bookingRepository.checkWorkSchedule(
        driverId,
        start,
        startTime,
        endTime,
      );

      await this.bookingRepository.checkTimeConflict(driverId, start, end);

      const validation = this.bookingRepository.validate();
      if (!validation.valid) {
        throw new BadRequestException(validation.errors.join(' '));
      }

      const booking = this.bookingRepository.manager.create(Booking, {
        driver: { id: driverId },
        student: { id: traineeId },
        startTime: start,
        endTime: end,
        message,
        status: AppointmentStatus.PENDING,
      });

      await queryRunner.manager.save(booking);
      await this.bookingRepository.commitTransaction(queryRunner);
      return booking;
    } catch (error) {
      await this.bookingRepository.rollbackTransaction(queryRunner);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    } finally {
      await this.bookingRepository.release(queryRunner);
    }
  }
  async driversList(query: PaginateQuery) {
    return paginate(query, this.driverRepo, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        'profile.licenseType': [FilterOperator.EQ],
      },
      defaultLimit: 10,
      maxLimit: 50,
    });
  }

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

  async filterBooking(query: PaginateQuery) {
    return await paginate(query, this.driverRepo, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['profile', 'schedules'],
      searchableColumns: ['profile.fullName', 'profile.carModel'],
      filterableColumns: {
        'profile.licenseType': [FilterOperator.EQ],
        'profile.gender': [FilterOperator.EQ],
        'profile.address': [FilterOperator.EQ],
        'profile.city': [FilterOperator.EQ, FilterOperator.ILIKE],
        'profile.hasGlasses': [FilterOperator.EQ],
        'profile.experienceYears': [FilterOperator.GTE, FilterOperator.LTE],
        'profile.age': [FilterOperator.GTE, FilterOperator.LTE],

        'schedules.startTimeFirst': [FilterOperator.EQ],
        'schedules.endTimeFirst': [FilterOperator.EQ],
        'schedules.dayOfWeek': [FilterOperator.EQ],
      },
      defaultLimit: 10,
      maxLimit: 50,
    });
  }

  async findAllForTrainee(
    query: PaginateQuery,
    traineeId: string,
  ): Promise<Paginated<Booking>> {
    return paginate(query, this.bookingRepo, {
      sortableColumns: ['createdAt', 'status', 'startTime', 'student.gender'],
      filterableColumns: { status: true, 'student.gender': true },
      relations: ['driver', 'driver.profile'],
      where: { student: { id: traineeId } },
    });
  }

  async findAllForDriver(
    query: PaginateQuery,
    driverId: string,
  ): Promise<Paginated<Booking>> {
    return paginate(query, this.bookingRepo, {
      sortableColumns: ['createdAt', 'status', 'startTime', 'student.gender'],
      searchableColumns: ['student.fullName'],
      filterableColumns: { status: true, 'student.gender': true },
      relations: ['student', 'student.user'],
      where: { driver: { id: driverId } },
    });
  }

  async findOne(bookingId: string, userId: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['driver', 'driver.profile', 'student', 'student.user'],
    });

    if (!booking) throw new NotFoundException('درخواست یافت نشد');

    const isOwner = booking.student?.id === userId;
    const isDriver = booking.driver?.id === userId;

    if (!isOwner && !isDriver) {
      throw new ForbiddenException('شما دسترسی مشاهده این درخواست را ندارید');
    }

    return booking;
  }

  async update(bookingId: string, driverId: string, dto: UpdateBookingDto) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId, driver: { id: driverId } },
    });

    if (!booking) throw new NotFoundException('نوبت یافت نشد');

    if (dto.note !== undefined) booking.note = dto.note;
    if (dto.score !== undefined) booking.score = dto.score;

    return this.bookingRepo.save(booking);
  }
}
