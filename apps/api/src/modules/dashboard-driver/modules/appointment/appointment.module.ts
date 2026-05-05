import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { AppointmentController } from './controllers/appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { AppointmentService } from './services/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Driver])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
