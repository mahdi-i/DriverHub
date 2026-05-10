import { GenderEnum } from '@driverhub/shared-types';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import { IsBoolean, IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  carModel: string;

  @IsString()
  carColor: string;
  @IsNumber()
  @Min(0)
  experienceYears: number;
  @IsString()
  fullName: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsNumber()
  age: number;

  @IsBoolean()
  hasGlasses: boolean;

  @IsString()
  medicalConditions: string;

  @IsEnum(IranProvinceEnum)
  address: IranProvinceEnum;
}
