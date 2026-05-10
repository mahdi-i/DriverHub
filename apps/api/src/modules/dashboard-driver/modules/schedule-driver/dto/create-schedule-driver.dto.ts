import { DaysOfWeek } from '@driverhub/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEnum,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';

export class CreateScheduleDriverDto {
  @ArrayNotEmpty()
  @IsEnum(DaysOfWeek, { each: true, message: 'روز های هفته نامعتبر' })
  dayOfWeek: DaysOfWeek[];

  @ApiProperty({ required: false, example: '10:00' })
  @IsMilitaryTime({ message: 'زمان وارد شده نامعتبر' })
  @IsOptional()
  startTimeFirst?: Date;

  @ApiProperty({ required: false, example: '12:00' })
  @IsMilitaryTime({ message: 'زمان وارد شده نامعتبر' })
  @IsOptional()
  endTimeFirst?: Date;

  @ApiProperty({ required: false, example: '16:00' })
  @IsMilitaryTime({ message: 'زمان وارد شده نامعتبر' })
  @IsOptional()
  startTimeSecond?: Date;

  @ApiProperty({ required: false, example: '20:00' })
  @IsMilitaryTime({ message: 'زمان وارد شده نامعتبر' })
  @IsOptional()
  endTimeSecond?: Date;
}
