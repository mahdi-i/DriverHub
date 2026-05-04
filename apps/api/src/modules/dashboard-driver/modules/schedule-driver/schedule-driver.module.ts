import { Module } from '@nestjs/common';
import { ScheduleDriverController } from './schedule-driver.controller';
import { ScheduleDriverService } from './schedule-driver.service';

@Module({
  controllers: [ScheduleDriverController],
  providers: [ScheduleDriverService],
})
export class ScheduleDriverModule {}
