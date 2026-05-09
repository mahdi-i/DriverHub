import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateBookingDto {
  @IsString()
  @IsOptional()
  note?: string;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  score?: number;
}
