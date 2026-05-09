import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { ProfileDriver } from '@core/dashboard-driver/modules/profile/entities/profile.entity';
import { ScheduleDriver } from '@core/dashboard-driver/modules/schedule-driver/entities/schedule-driver.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, ProfileDriver, ScheduleDriver])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
