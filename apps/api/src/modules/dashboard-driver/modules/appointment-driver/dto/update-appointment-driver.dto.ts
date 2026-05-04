import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDriverDto } from './create-appointment-driver.dto';

export class UpdateAppointmentDriverDto extends PartialType(
  CreateAppointmentDriverDto,
) {}
