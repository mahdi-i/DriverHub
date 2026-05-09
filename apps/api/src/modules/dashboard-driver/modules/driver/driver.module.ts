import { Booking } from '@core/booking/entities/booking.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileDriver } from '../profile/entities/profile.entity';
import { ScheduleDriver } from '../schedule-driver/entities/schedule-driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, ScheduleDriver, ProfileDriver, Booking]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
