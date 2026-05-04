import { AppointmentRequest } from '@core/dashboard-trainee/modules/appointment-requests/entities/appointment-request.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleDriver } from '../schedule-driver/entities/schedule-driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, ScheduleDriver, AppointmentRequest]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
