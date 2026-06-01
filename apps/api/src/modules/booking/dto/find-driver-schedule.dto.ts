import { DaysOfWeek } from '@driverhub/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';

export class FindDriverScheduleDto {
  @ApiProperty()
  @IsUUID()
  driverId: string;

  @ApiProperty({ enum: DaysOfWeek, example: DaysOfWeek.MONDAY })
  @IsEnum(DaysOfWeek)
  dayOfWeek: DaysOfWeek;
}
