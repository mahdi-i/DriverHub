import { PartialType } from '@nestjs/mapped-types';

import { CreateScheduleDriverDto } from './create-schedule-driver.dto';

export class UpdateScheduleDriverDto extends PartialType(
  CreateScheduleDriverDto,
) {}
