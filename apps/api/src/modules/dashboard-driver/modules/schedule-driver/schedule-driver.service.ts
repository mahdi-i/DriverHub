import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateScheduleDriverDto } from './dto/create-schedule-driver.dto';
import { UpdateScheduleDriverDto } from './dto/update-schedule-driver.dto';
import { ScheduleDriver } from './entities/schedule-driver.entity';

@Injectable()
export class ScheduleDriverService {
  constructor(
    @InjectRepository(ScheduleDriver)
    private readonly schduleDriverRepository: Repository<ScheduleDriver>,
  ) {}
  async create(dto: CreateScheduleDriverDto, userId: string) {
    if (dto.dayOfWeek.length === 1) {
      const newWorkSchedule = this.schduleDriverRepository.create({
        driverId: userId,
        dayOfWeek: dto.dayOfWeek[0],
        startTimeFirst: dto.startTimeFirst,
        endTimeFirst: dto.endTimeFirst,
        startTimeSecond: dto.startTimeSecond,
        endTimeSecond: dto.endTimeSecond,
      } as ScheduleDriver);
      return await this.schduleDriverRepository.save(newWorkSchedule);
    } else {
      const schedules: ScheduleDriver[] = dto.dayOfWeek.map((day) => {
        return this.schduleDriverRepository.create({
          driverId: userId,
          startTimeFirst: dto.startTimeFirst,
          endTimeFirst: dto.endTimeFirst,
          startTimeSecond: dto.startTimeSecond,
          endTimeSecond: dto.endTimeSecond,
          dayOfWeek: day,
        } as ScheduleDriver);
      });

      return await this.schduleDriverRepository.save(schedules);
    }
  }

  async findAll(
    userId: string,
    query: PaginateQuery,
  ): Promise<Paginated<ScheduleDriver>> {
    return await paginate(query, this.schduleDriverRepository, {
      where: {
        driverId: userId,
      },
      defaultSortBy: [['createdAt', 'DESC']],
      select: [
        'id',
        'dayOfWeek',
        'startTimeFirst',
        'endTimeFirst',
        'startTimeSecond',
        'endTimeSecond',
        'createdAt',
      ],
      filterableColumns: {
        driverId: [FilterOperator.EQ],
        dayOfWeek: [FilterOperator.EQ],
      },
      sortableColumns: ['dayOfWeek', 'createdAt'],
    });
  }

  async findOne(id: string, userId: string) {
    const schedule = await this.schduleDriverRepository.findOne({
      where: { id, driverId: userId },
    });

    if (!schedule) {
      throw new NotFoundException('برنامه‌ای با این مشخصات یافت نشد');
    }

    return schedule;
  }

  async update(id: string, dto: UpdateScheduleDriverDto, userId: string) {
    const schedule = await this.schduleDriverRepository.findOne({
      where: { id, driverId: userId },
    });

    if (!schedule) {
      throw new NotFoundException('برنامه‌ای با این مشخصات یافت نشد');
    }

    Object.assign(schedule, dto);

    return await this.schduleDriverRepository.save(schedule);
  }

  async remove(id: string, userId: string) {
    const schedule = await this.schduleDriverRepository.findOne({
      where: { id, driverId: userId },
    });

    if (!schedule) {
      throw new NotFoundException('برنامه‌ای با این مشخصات یافت نشد');
    }

    await this.schduleDriverRepository.remove(schedule);
    return { message: 'برنامه با موفقیت حذف شد' };
  }
}
