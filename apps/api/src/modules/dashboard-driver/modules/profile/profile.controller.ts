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

import { GenderEnum, LicenseTypeEnum, Roles } from '@driverhub/shared-types';
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
        fullName: { type: 'string', example: 'مهدی باقری' },
        gender: {
          type: 'enum',
          enum: [GenderEnum.FEMALE, GenderEnum.MALE],
          example: 'male',
        },
        licenseNumber: { type: 'string', example: '1234567890' },
        experienceYears: { type: 'number', example: 5 },
        carModel: { type: 'string', example: 'پژو ۲۰۶' },
        carColor: { type: 'string', example: 'سفید' },
        bankAccountNumber: { type: 'string', example: '1234567890123456' },
        licenseType: { type: 'enum', example: LicenseTypeEnum.CAR },
      },
      required: [
        'fullName',
        'gender',
        'licenseNumber',
        'experienceYears',
        'bankAccountNumber',
        'file',
        'licenseType',
        'carModel',
        'carColor',
      ],
    },
  })
  async createProfile(
    @Body() createBasicProfileDto: CreateBasicProfileDto,
    @UserInfo('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(userId);

    return this.profileService.createProfile(
      createBasicProfileDto,
      userId,
      file,
    );
  }

  @Post('complet-profile')
  @UseGuards(ProfileCompleteGuard)
  async completProfile(
    @Body() createCompletProfile: CreateCompletProfileDto,
    @UserInfo('id') id: string,
  ) {
    return this.profileService.completProfile(createCompletProfile, id);
  }

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.profileService.getProfile(id);
  }

  @Put(':id')
  @UseGuards(ProfileCompleteGuard)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
}
