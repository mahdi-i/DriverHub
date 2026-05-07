import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from '../trainee/entities/trainee.entity';
import { AppointmentRequestsController } from './appointment-requests.controller';
import { AppointmentRequestsService } from './appointment-requests.service';
import { AppointmentRequest } from './entities/appointment-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainee, Driver, Trainee, AppointmentRequest]),
  ],
  controllers: [AppointmentRequestsController],
  providers: [AppointmentRequestsService],
})
export class AppointmentRequestsModule {}
