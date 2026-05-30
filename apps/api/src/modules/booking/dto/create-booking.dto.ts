import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
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

  @ApiProperty({ required: false, example: '2026-05-23' })
  @IsDateString()
  @IsNotEmpty()
  bookingDate: string;

  @ApiProperty({ example: '14:00' })
  @IsMilitaryTime({ message: 'ساعت نامعتبر است' })
  startTime: string;

  @ApiProperty({ example: '15:00' })
  @IsMilitaryTime({ message: 'ساعت نامعتبر است' })
  endTime: string;

  @IsString()
  @IsOptional()
  message?: string;
}
