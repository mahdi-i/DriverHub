import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentRequestDto } from './create-appointment_request.dto';

export class UpdateAppointmentRequestDto extends PartialType(
  CreateAppointmentRequestDto,
) {}
