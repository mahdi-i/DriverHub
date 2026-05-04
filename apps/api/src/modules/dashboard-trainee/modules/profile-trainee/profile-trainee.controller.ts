import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { SkipTraineeProfileCheck } from '@shared/decorators/skip-profile-trainee.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { CreateProfileTraineeDto } from './dto/create-profile-trainee.dto';
import { UpdateProfileTraineeDto } from './dto/update-profile-trainee.dto';
import { ProfileTraineeService } from './profile-trainee.service';

@Controller('profile-trainee')
export class ProfileTraineeController {
  constructor(private readonly profileTraineeService: ProfileTraineeService) {}

  @Post('profile')
  @SkipTraineeProfileCheck()
  async createProfile(
    @Body() createDto: CreateProfileTraineeDto,
    @UserInfo('id') userId: string,
  ) {
    return this.profileTraineeService.createProfile(createDto, userId);
  }

  @Get('profile')
  async getProfile(@UserInfo('id') userId: string) {
    return this.profileTraineeService.getProfile(userId);
  }

  @Put('profile')
  async updateProfile(
    @UserInfo('id') userId: string,
    @Body() updateDto: UpdateProfileTraineeDto,
  ) {
    return this.profileTraineeService.updateProfile(userId, updateDto);
  }
}
