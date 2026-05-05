import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}
  async completedAppointment(appointmentId: string, id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['driver'],
    });
    if (!appointment) {
      throw new NotFoundException('نوبت یافت نشد');
    }

    if (appointment.driver.id !== id) {
      throw new ForbiddenException('شما دسترسی به این نوبت ندارید');
    }
    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new BadRequestException(
        'فقط نوبت‌ های برنامه‌ ریزی شده قابل تکمیل هستند',
      );
    }
    await this.appointmentRepository.update(
      { id: appointmentId },
      { status: AppointmentStatus.COMPLETED },
    );

    return { message: 'نوبت با موفقیت تکمیل شد' };
  }
  async camcelledAppointment(appointmentId: string, id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['driver'],
    });

    if (!appointment) {
      throw new NotFoundException('نوبت یافت نشد');
    }

    if (appointment.driver.id !== id) {
      throw new ForbiddenException('شما دسترسی به این نوبت ندارید');
    }

    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new BadRequestException(
        'فقط نوبت ‌های برنامه‌ ریزی شده قابل لغو هستند',
      );
    }

    await this.appointmentRepository.update(
      { id: appointmentId },
      { status: AppointmentStatus.CANCELLED },
    );

    return { message: 'نوبت با موفقیت لغو شد' };
  }

  async findAllByDriver(
    query: PaginateQuery,
    driverId: string,
  ): Promise<Paginated<Appointment>> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
    });
    if (!driver) {
      throw new NotFoundException('مربی یافت نشد');
    }

    return paginate(query, this.appointmentRepository, {
      sortableColumns: ['startTime', 'createdAt', 'status', 'score'],
      searchableColumns: ['student.fullName', 'student.user.phone'],
      filterableColumns: {
        status: true,
        score: true,
      },
      relations: ['student', 'student.user', 'driver'],
      where: { driver: { id: driverId } },
      defaultLimit: 10,
      maxLimit: 50,
    });
  }

  async findOne(appointmentId: string, driverId: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['driver', 'student', 'student.user'],
    });

    if (!appointment) {
      throw new NotFoundException('نوبت یافت نشد');
    }

    if (appointment.driver.id !== driverId) {
      throw new ForbiddenException('شما دسترسی به این نوبت ندارید');
    }

    return appointment;
  }

  async update(
    appointmentId: string,
    driverId: string,
    updateDto: UpdateAppointmentDto,
  ) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['driver'],
    });
    if (!appointment) {
      throw new NotFoundException('نوبت یافت نشد');
    }
    if (appointment.driver.id !== driverId) {
      throw new ForbiddenException('شما دسترسی به این بخش ندارید');
    }

    if (updateDto.note) {
      appointment.note = updateDto.note;
    }

    if (updateDto.score) {
      appointment.score = updateDto.score;
    }
    await this.appointmentRepository.save(appointment);
    return { message: 'نوبت با موفقیت بروزشد', data: appointment };
  }
}
