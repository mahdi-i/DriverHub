import { AppointmentRequest } from '@core/dashboard-trainee/modules/appointment-requests/entities/appointment-request.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import { ProfileDriver } from '../profile/entities/profile.entity';
import { ScheduleDriver } from '../schedule-driver/entities/schedule-driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Driver,
      ScheduleDriver,
      AppointmentRequest,
      Appointment,
      ProfileDriver,
    ]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
