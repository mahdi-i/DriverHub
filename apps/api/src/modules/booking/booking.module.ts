import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { ProfileDriver } from '@core/dashboard-driver/modules/profile/entities/profile.entity';
import { ScheduleDriver } from '@core/dashboard-driver/modules/schedule-driver/entities/schedule-driver.entity';
import { Trainee } from '@core/dashboard-trainee/modules/trainee/entities/trainee.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionBookingController } from './controllers/action-booking.controller';
import { BookingController } from './controllers/booking.controller';
import { Booking } from './entities/booking.entity';
import { BookingRepository } from './repository/booking.repository';
import { ActionBookingService } from './services/action-booking.service';
import { BookingService } from './services/booking.service';
import { GetFreeSlot } from './services/get-Free-slots.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Driver,
      Booking,
      Trainee,
      ProfileDriver,
      ScheduleDriver,
    ]),
  ],
  controllers: [BookingController, ActionBookingController],
  providers: [
    BookingService,
    ActionBookingService,
    BookingRepository,
    GetFreeSlot,
  ],
  exports: [BookingService],
})
export class BookingModule {}
