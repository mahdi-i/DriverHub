import { PartialType } from '@nestjs/mapped-types';

import { CreateAppointmentRequestDto } from './create-appointment_request.dto';

export class UpdateAppointmentRequestDto extends PartialType(
  CreateAppointmentRequestDto,
) {}
