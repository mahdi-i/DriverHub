import { GenderEnum } from '@shared/enums/gender.enum';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBasicProfileDto {
  @IsString()
  fullName: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsString()
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
  bankAccountNumber: string;
}
export class CreateCompletProfileDto {
  @IsNotEmpty()
  age: number;

  @IsString()
  nationalCode: string;

  @IsNotEmpty()
  @IsBoolean()
  hasGlasses: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  medicalConditions?: string;

  @IsEnum(IranProvinceEnum)
  address: IranProvinceEnum;
}
