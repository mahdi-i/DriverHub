import { IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  note: string;

  @IsNumber()
  score: number;
}
