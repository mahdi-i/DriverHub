import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TraineeController } from './trainee.controller';

@Module({
  controllers: [TraineeController],
  providers: [TraineeService],
})
export class TraineeModule {}
