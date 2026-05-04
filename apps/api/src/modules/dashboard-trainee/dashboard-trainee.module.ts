import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraineeProfileCompleteGuard } from './guard/trainee-profile-complete.guard';
import { AppointmentRequestsModule } from './modules/appointment-requests/appointment-requests.module';
import { ProfileTraineeModule } from './modules/profile-trainee/profile-trainee.module';
import { Trainee } from './modules/trainee/entities/trainee.entity';
import { TraineeModule } from './modules/trainee/trainee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainee]),
    AppointmentRequestsModule,
    ProfileTraineeModule,
    TraineeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TraineeProfileCompleteGuard,
    },
  ],
})
export class DashboardTraineeModule {}
