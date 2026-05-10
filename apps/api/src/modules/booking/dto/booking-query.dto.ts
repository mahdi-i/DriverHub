import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class BookingQueryDto {
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
