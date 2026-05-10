import { Roles } from '@driverhub/shared-types';
import { IsBoolean, IsEnum, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(Roles)
  role: Roles;
}
