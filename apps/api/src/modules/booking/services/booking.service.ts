import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { EntityManager, Repository } from 'typeorm';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { Booking } from '../entities/booking.entity';
import { ScheduleValidationService } from './schedule-validation.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Driver)
    private driverRepo: Repository<Driver>,
    private entityManager: EntityManager,
    private scheduleValidationService: ScheduleValidationService,
  ) {}

  async create(dto: CreateBookingDto, traineeId: string) {
    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('فرمت تاریخ نامعتبر است.');
    }
    if (end <= start) {
      throw new BadRequestException('زمان پایان باید بعد از زمان شروع باشد.');
    }
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        await this.scheduleValidationService.checkWorkSchedule(
          dto.driverId,
          start,
          start,
          end,
          transactionalEntityManager,
        );
        const isConflict =
          await this.scheduleValidationService.checkTimeConflict(
            dto.driverId,
            start,
            end,
            transactionalEntityManager,
          );

        if (isConflict) {
          throw new BadRequestException(
            'متأسفانه این بازه زمانی قبلاً رزرو شده است یا تداخل دارد.',
          );
        }
        const booking = transactionalEntityManager.create(Booking, {
          driver: { id: dto.driverId },
          student: { id: traineeId },
          startTime: start,
          endTime: end,
          message: dto.message,
          status: AppointmentStatus.PENDING,
        });

        const savedBooking = await transactionalEntityManager.save(booking);

        return savedBooking;
      },
    );
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
    const qb = this.driverRepo
      .createQueryBuilder('driver')
      .leftJoinAndSelect('driver.profile', 'profile')
      .leftJoinAndSelect('driver.schedules', 'schedules')
      .where('profile.isProfileComplete = :isComplete', { isComplete: true });
    return paginate(query, qb, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        'profile.licenseType': [FilterOperator.EQ],
        'profile.gender': [FilterOperator.EQ],
        'profile.address': [FilterOperator.EQ],
        'profile.city': [FilterOperator.EQ, FilterOperator.ILIKE],
        'profile.hasGlasses': [FilterOperator.EQ],
        'profile.experienceYears': [FilterOperator.GTE, FilterOperator.LTE],
        'profile.age': [FilterOperator.GTE, FilterOperator.LTE],
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
      sortableColumns: ['createdAt', 'status', 'startTime'],
      filterableColumns: { status: true },
      relations: ['driver', 'driver.profile'],
      where: { student: { id: traineeId } },
    });
  }

  async findAllForDriver(
    query: PaginateQuery,
    driverId: string,
  ): Promise<Paginated<Booking>> {
    return paginate(query, this.bookingRepo, {
      sortableColumns: ['createdAt', 'status', 'startTime'],
      searchableColumns: ['student.fullName'],
      filterableColumns: { status: true },
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
