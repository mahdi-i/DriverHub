import { TraineeProfileCompleteGuard } from '@core/dashboard-trainee/guard/trainee-profile-complete.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { TraineeService } from './trainee.service';

@Controller('trainee')
@UseGuards(TraineeProfileCompleteGuard)
export class TraineeController {
  constructor(private readonly traineeService: TraineeService) {}
}
