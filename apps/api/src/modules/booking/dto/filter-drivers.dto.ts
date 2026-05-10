import {
  DaysOfWeek,
  GenderEnum,
  LicenseTypeEnum,
} from '@driverhub/shared-types';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class FilterDriversDto {
  @IsEnum(LicenseTypeEnum)
  @IsOptional()
  licenseType?: LicenseTypeEnum;

  @IsString()
  @IsOptional()
  carModel?: string;

  @IsString()
  @IsOptional()
  carColor?: string;

  @IsEnum(IranProvinceEnum)
  @IsOptional()
  province?: IranProvinceEnum;

  @IsString()
  @IsOptional()
  city?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  minExperienceYears?: number;

  @IsInt()
  @Min(18)
  @Max(80)
  @IsOptional()
  @Type(() => Number)
  minAge?: number;

  @IsInt()
  @Max(5)
  @IsOptional()
  @Type(() => Number)
  maxAge?: number;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  hasGlasses?: boolean;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  @Type(() => Number)
  minScore?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  minCompletedAppointments?: number;

  @IsEnum(DaysOfWeek)
  @IsOptional()
  availableDay?: DaysOfWeek;

  @IsString()
  @IsOptional()
  availableTimeFrom?: string;

  @IsString()
  @IsOptional()
  availableTimeTo?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
