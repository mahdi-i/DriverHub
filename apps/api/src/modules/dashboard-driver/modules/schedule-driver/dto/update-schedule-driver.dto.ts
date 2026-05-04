import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDriverDto } from './create-schedule-driver.dto';

export class UpdateScheduleDriverDto extends PartialType(
  CreateScheduleDriverDto,
) {}
