import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleDriver } from './entities/schedule-driver.entity';
import { ScheduleDriverController } from './schedule-driver.controller';
import { ScheduleDriverService } from './schedule-driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleDriver])],
  controllers: [ScheduleDriverController],
  providers: [ScheduleDriverService],
})
export class ScheduleDriverModule {}
