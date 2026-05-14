import { IsString } from 'class-validator';

export class CreateSupportDto {
  @IsString()
  content: string;

  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;
}
