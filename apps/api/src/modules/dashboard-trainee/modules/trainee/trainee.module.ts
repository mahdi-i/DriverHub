import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from './entities/trainee.entity';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],
  controllers: [TraineeController],
  providers: [TraineeService],
  exports: [TypeOrmModule, TraineeService],
})
export class TraineeModule {}
