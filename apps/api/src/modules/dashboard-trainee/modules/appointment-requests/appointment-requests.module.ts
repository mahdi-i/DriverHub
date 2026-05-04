import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from '../trainee/entities/trainee.entity';
import { AppointmentRequestsController } from './appointment-requests.controller';
import { AppointmentRequestsService } from './appointment-requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee, Driver])],
  controllers: [AppointmentRequestsController],
  providers: [AppointmentRequestsService],
})
export class AppointmentRequestsModule {}
