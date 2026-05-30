import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { ProfileDriver } from '../profile/entities/profile.entity';
import { ScheduleDriver } from './entities/schedule-driver.entity';
import { ScheduleDriverController } from './schedule-driver.controller';
import { ScheduleDriverService } from './schedule-driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleDriver, ProfileDriver, Driver])],
  controllers: [ScheduleDriverController],
  providers: [ScheduleDriverService],
})
export class ScheduleDriverModule {}
