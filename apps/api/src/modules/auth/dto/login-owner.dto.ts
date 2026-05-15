import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginOwnerDto {
  @ApiProperty({ example: 'username-1' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'pass-1' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'pass-2' })
  @IsString()
  secondPassword: string;
}
