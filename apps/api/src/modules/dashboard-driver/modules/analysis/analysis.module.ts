import { AppointmentRequest } from '@core/dashboard-trainee/modules/appointment-requests/entities/appointment-request.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import { ProfileDriver } from '../profile/entities/profile.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, AppointmentRequest, ProfileDriver]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
