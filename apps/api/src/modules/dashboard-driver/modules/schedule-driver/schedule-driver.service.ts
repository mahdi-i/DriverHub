import { Injectable } from '@nestjs/common';
import { CreateScheduleDriverDto } from './dto/create-schedule-driver.dto';
import { UpdateScheduleDriverDto } from './dto/update-schedule-driver.dto';

@Injectable()
export class ScheduleDriverService {
  create(createScheduleDriverDto: CreateScheduleDriverDto) {
    return 'This action adds a new scheduleDriver';
  }

  findAll() {
    return `This action returns all scheduleDriver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleDriver`;
  }

  update(id: number, updateScheduleDriverDto: UpdateScheduleDriverDto) {
    return `This action updates a #${id} scheduleDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleDriver`;
  }
}
