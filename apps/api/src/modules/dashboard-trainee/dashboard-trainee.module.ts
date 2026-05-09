import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileTraineeModule } from './modules/profile-trainee/profile-trainee.module';
import { Trainee } from './modules/trainee/entities/trainee.entity';
import { TraineeModule } from './modules/trainee/trainee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainee]),
    ProfileTraineeModule,
    TraineeModule,
  ],
  controllers: [],
})
export class DashboardTraineeModule {}
