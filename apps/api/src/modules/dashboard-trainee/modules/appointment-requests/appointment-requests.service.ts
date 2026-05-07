import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestStatus } from '@shared/enums/request-status.enum';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { Trainee } from '../trainee/entities/trainee.entity';
import { AppointmentRequest } from './entities/appointment-request.entity';

@Injectable()
export class AppointmentRequestsService {
  constructor(
    @InjectRepository(AppointmentRequest)
    private appointmentRequest: Repository<AppointmentRequest>,
    @InjectRepository(Trainee)
    private trineeRepository: Repository<Trainee>,
  ) {}
  async camcelledAppointment(appointmentId: string, userid: string) {
    const appointment = await this.appointmentRequest.findOne({
      where: { id: appointmentId },
      relations: ['student'],
    });

    if (!appointment) {
      throw new NotFoundException('نوبت یافت نشد');
    }

    if (appointment.driver.id !== userid) {
      throw new ForbiddenException('شما دسترسی به این نوبت ندارید');
    }

    if (appointment.status !== RequestStatus.PENDING) {
      throw new BadRequestException(
        'فقط نوبت ‌های برنامه‌ ریزی شده قابل لغو هستند',
      );
    }

    await this.appointmentRequest.update(
      { id: appointmentId },
      { status: RequestStatus.REJECTED },
    );

    return { message: 'نوبت با موفقیت لغو شد' };
  }

  async findAll(
    query: PaginateQuery,
    userId: string,
  ): Promise<Paginated<AppointmentRequest>> {
    const trinee = await this.trineeRepository.findOne({
      where: { id: userId },
    });
    if (!trinee) {
      throw new NotFoundException('اموزگار یافت نشد');
    }

    return paginate(query, this.appointmentRequest, {
      sortableColumns: ['createdAt', 'status', 'student.gender'],
      filterableColumns: {
        status: true,
      },
      relations: ['student', 'driver'],
      where: { student: { id: userId } },
      defaultLimit: 10,
      maxLimit: 50,
    });
  }
}
