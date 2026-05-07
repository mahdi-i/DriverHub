import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { ProfileDriver } from '../profile/entities/profile.entity';
import { AppointmentController } from './controllers/appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { AppointmentService } from './services/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Driver, ProfileDriver])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
