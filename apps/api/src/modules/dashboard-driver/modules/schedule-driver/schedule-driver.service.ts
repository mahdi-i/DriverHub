import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { In, Repository } from 'typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { CreateScheduleDriverDto } from './dto/create-schedule-driver.dto';
import { UpdateScheduleDriverDto } from './dto/update-schedule-driver.dto';
import { ScheduleDriver } from './entities/schedule-driver.entity';

@Injectable()
export class ScheduleDriverService {
  constructor(
    @InjectRepository(ScheduleDriver)
    private readonly schduleDriverRepository: Repository<ScheduleDriver>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}
  async create(dto: CreateScheduleDriverDto, userId: string) {
    const driver = await this.driverRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!driver) {
      throw new NotFoundException('رکورد راننده برای این کاربر یافت نشد');
    }
    const chdule = await this.schduleDriverRepository.findOne({
      where: {
        driverId: driver.id,
        dayOfWeek: In(dto.dayOfWeek),
      },
    });
    console.log(chdule, 'chdule');
    if (chdule) {
      throw new BadRequestException('روز از قبل وجود دارد');
    }

    if (dto.dayOfWeek.length === 1) {
      const newWorkSchedule = this.schduleDriverRepository.create({
        driverId: driver.id,
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
          driverId: driver.id,
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
    const driver = await this.driverRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!driver) {
      throw new NotFoundException('کاربر با این ایدی پیدا نشد یا راننده نیست');
    }
    console.log(driver, 'driver');
    return await paginate(query, this.schduleDriverRepository, {
      where: {
        driver: {
          id: driver.id,
        },
      },
      relations: ['driver'],
      defaultSortBy: [['createdAt', 'DESC']],
      select: [
        'id',
        'dayOfWeek',
        'startTimeFirst',
        'endTimeFirst',
        'startTimeSecond',
        'endTimeSecond',
        'createdAt',
        'driver.id',
      ],

      sortableColumns: ['dayOfWeek', 'createdAt'],
    });
  }

  async findOne(id: string, driverId: string) {
    const schedule = await this.schduleDriverRepository.findOne({
      where: { id, driver: { id: driverId } },
      select: [
        'id',
        'driverId',
        'dayOfWeek',
        'startTimeFirst',
        'endTimeFirst',
        'startTimeSecond',
        'endTimeSecond',
        'createdAt',
        'updatedAt',
      ],
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

  async remove(id: string, driverId: string) {
    const schedule = await this.schduleDriverRepository.findOne({
      where: { id, driver: { id: driverId } },
    });

    if (!schedule) {
      throw new NotFoundException('برنامه‌ای با این مشخصات یافت نشد');
    }

    await this.schduleDriverRepository.remove(schedule);
    return { message: 'برنامه با موفقیت حذف شد' };
  }
}
