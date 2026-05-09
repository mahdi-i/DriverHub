import { GenderEnum } from '@shared/enums/gender.enum';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
export class UpdateProfileTraineeDto {
  @IsString()
  fullName: string;

  @IsNumber()
  @Min(18, { message: 'سن باید حداقل ۱۸ سال باشد' })
  @Max(80, { message: 'سن باید حداکثر ۸۰ سال باشد' })
  age: number;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsBoolean()
  hasGlasses: boolean;

  @IsOptional()
  @IsString()
  medicalConditions?: string;

  @IsEnum(IranProvinceEnum)
  address: IranProvinceEnum;

  @IsString()
  @Length(10, 10, { message: 'کد پستی باید ۱۰ رقم باشد' })
  postalCode: string;
}
