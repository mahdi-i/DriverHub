import { ApiProperty } from '@nestjs/swagger';
import {
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({ required: false, example: '10:00' })
  @IsMilitaryTime({ message: 'زمان وارد شده نامعتبر' })
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ required: false, example: '10:00' })
  @IsMilitaryTime({ message: 'زمان وارد شده نامعتبر' })
  @IsNotEmpty()
  endTime: Date;

  @IsString()
  @IsOptional()
  message?: string;
}
