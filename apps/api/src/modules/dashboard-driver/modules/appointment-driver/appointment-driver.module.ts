import { Module } from '@nestjs/common';
import { AppointmentDriverService } from './appointment-driver.service';
import { AppointmentDriverController } from './appointment-driver.controller';

@Module({
  controllers: [AppointmentDriverController],
  providers: [AppointmentDriverService],
})
export class AppointmentDriverModule {}
