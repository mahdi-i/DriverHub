import { Controller } from '@nestjs/common';
import { TraineeService } from './trainee.service';

@Controller('trainee')
export class TraineeController {
  constructor(private readonly traineeService: TraineeService) {}
}
