import { GenderEnum, LicenseTypeEnum } from '@driverhub/shared-types';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBasicProfileDto {
  @IsString()
  fullName: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsString()
  @IsNumberString({}, { message: 'شماره گواهی نامه باید فقط شامل عدد باشد' })
  licenseNumber: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  experienceYears: number;

  @IsString()
  carModel: string;

  @IsString()
  carColor: string;

  @IsString()
  @IsNumberString({}, { message: 'شماره حساب باید فقط شامل عدد باشد' })
  bankAccountNumber: string;

  @IsEnum(LicenseTypeEnum)
  @IsNotEmpty()
  licenseType: LicenseTypeEnum;
}
export class CreateCompletProfileDto {
  @IsNotEmpty()
  @Min(18)
  @Max(80)
  age: number;

  @IsString()
  @IsNumberString({}, { message: ' کدملی نامه باید فقط شامل عدد باشد' })
  nationalCode: string;

  @IsNotEmpty()
  @IsBoolean()
  hasGlasses: boolean;

  @IsString()
  @IsOptional()
  medicalConditions?: string;

  @IsEnum(IranProvinceEnum, { message: 'فرمت استان را درست وارد کنید' })
  address: IranProvinceEnum;

  @IsString()
  city: string;
}
