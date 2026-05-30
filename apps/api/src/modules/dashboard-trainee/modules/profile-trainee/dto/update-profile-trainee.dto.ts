import { GenderEnum } from '@driverhub/shared-types';
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
  // چون آپدیت است، همه فیلدها باید Optional باشند مگر اینکه بخواهی اجباری باشد
  @IsOptional()
  @IsString()
  fullName?: string;

  // nationalCode معمولاً تغییر نمی‌کند، پس اگر هم باشد یا نباشد مشکلی نیست
  // اگر می‌خواهی کاربر نتواند آن را تغییر دهد، اصلاً اینجا نیاور
  // اگر می‌خواهی اجازه تغییر بدهی، باید optional باشد:
  @IsOptional()
  @IsString()
  @Length(10, 10, { message: 'کد ملی باید ۱۰ رقم باشد' })
  nationalCode?: string;

  @IsOptional()
  @IsNumber()
  @Min(18, { message: 'سن باید حداقل ۱۸ سال باشد' })
  @Max(80, { message: 'سن باید حداکثر ۸۰ سال باشد' })
  age?: number;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsBoolean()
  hasGlasses?: boolean;

  @IsOptional()
  @IsString()
  medicalConditions?: string;

  @IsOptional()
  @IsEnum(IranProvinceEnum)
  address?: IranProvinceEnum;

  @IsOptional()
  @IsString()
  @Length(10, 10, { message: 'کد پستی باید ۱۰ رقم باشد' })
  postalCode?: string;
}
