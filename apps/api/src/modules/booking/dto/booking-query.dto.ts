import { AppointmentStatus } from '@driverhub/shared-types';
import { IsEnum, IsOptional } from 'class-validator';

export class BookingQueryDto {
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
