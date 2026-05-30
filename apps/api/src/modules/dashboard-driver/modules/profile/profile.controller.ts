import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { SkipProfileCheck } from '@shared/decorators/skip-profile-driver.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';

import { Roles } from '@driverhub/shared-types';
import {
  CreateBasicProfileDto,
  CreateCompletProfileDto,
} from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile-driver')
@RolesDecorator(Roles.TEACHER)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('introduction')
  @SkipProfileCheck()
  async createProfile(
    @Body() createBasicProfileDto: CreateBasicProfileDto,
    @UserInfo('driverId') driverId: string,
    @UserInfo('id') id: string,
  ) {
    return this.profileService.createProfile(
      createBasicProfileDto,
      driverId,
      id,
    );
  }

  @Post('license-file')
  @UseInterceptors(FileInterceptor('file'))
  @SkipProfileCheck()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'فایل مدرک (تصویر)',
        },
      },
      required: ['file'],
    },
  })
  async createFile(
    @UserInfo('driverId') driverId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(driverId);

    return this.profileService.createFile(driverId, file);
  }

  @Post('complet-profile')
  @SkipProfileCheck()
  @UseGuards(ProfileCompleteGuard)
  async completProfile(
    @Body() createCompletProfile: CreateCompletProfileDto,
    @UserInfo('driverId') driverId: string,
  ) {
    return this.profileService.completProfile(createCompletProfile, driverId);
  }

  @Get()
  getProfile(@UserInfo('driverId') driverId: string) {
    return this.profileService.getProfile(driverId);
  }

  @Put(':id')
  @UseGuards(ProfileCompleteGuard)
  update(
    @Param('id') driverId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(driverId, updateProfileDto);
  }
}
