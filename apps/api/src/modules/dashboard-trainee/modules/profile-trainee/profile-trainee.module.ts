import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from '../trainee/entities/trainee.entity';
import { ProfileTraineeController } from './profile-trainee.controller';
import { ProfileTraineeService } from './profile-trainee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],
  controllers: [ProfileTraineeController],
  providers: [ProfileTraineeService],
})
export class ProfileTraineeModule {}
