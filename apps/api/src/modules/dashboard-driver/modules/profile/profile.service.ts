import { UserService } from '@core/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '@shared/services/file.service';
import { Repository } from 'typeorm';
import {
  CreateBasicProfileDto,
  CreateCompletProfileDto,
} from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileDriver } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(ProfileDriver)
    private profileRepository: Repository<ProfileDriver>,
    private userService: UserService,
  ) {}
  async createProfile(
    createBasicProfile: CreateBasicProfileDto,
    driverId: string,
    id: string,
  ) {
    const exsistProfile = await this.profileRepository.findOne({
      where: { bankAccountNumber: createBasicProfile.bankAccountNumber },
    });
    console.log(exsistProfile);
    if (exsistProfile) {
      throw new BadRequestException('اطلاعات از قبل ثبت شده ');
    }
    console.log(driverId, 'driverId driverId driverId driverId');
    console.log(id, 'id id id id');
    const profile = this.profileRepository.create({
      user: { id },
      driver: { id: driverId },
      fullName: createBasicProfile.fullName,
      gender: createBasicProfile.gender,
      licenseNumber: createBasicProfile.licenseNumber,
      experienceYears: createBasicProfile.experienceYears,
      carModel: createBasicProfile.carModel,
      carColor: createBasicProfile.carColor,
      bankAccountNumber: createBasicProfile.bankAccountNumber,
    });
    const savedProfile = await this.profileRepository.save(profile);

    return {
      message: 'پروفایل با موفقیت ذخیره شد',
      data: savedProfile,
    };
  }
  async createFile(driverId: string, file: Express.Multer.File) {
    let certificateUrl: string | undefined;

    if (file) {
      const uploadLicense = await this.fileService.uploadFile(file);
      certificateUrl = uploadLicense.url;
    }

    const profile = await this.profileRepository.findOne({
      where: { driver: { id: driverId } },
    });

    if (!profile) {
      throw new BadRequestException(
        'پروفایل شما یافت نشد. لطفاً ابتدا اطلاعات اولیه پروفایل را تکمیل کنید.',
      );
    }

    if (certificateUrl) {
      profile.certificateUrl = certificateUrl;
    }

    const savedProfile = await this.profileRepository.save(profile);

    return {
      message: 'فایل با موفقیت آپلود و ذخیره شد.',
      data: savedProfile,
    };
  }

  async getProfile(driverId: string) {
    const profile = await this.profileRepository.findOne({
      where: { driver: { id: driverId } },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException('پروفایل این راننده یافت نشد.');
    }

    return profile;
  }
  async getSummary(driverId: string) {
    const profile = await this.profileRepository.findOne({
      where: { driver: { id: driverId } },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException('پروفایل این راننده یافت نشد.');
    }

    return { fullName: profile.fullName };
  }

  async completProfile(
    createCompletProfile: CreateCompletProfileDto,
    driverId: string,
  ) {
    const { nationalCode } = createCompletProfile;

    const existUser = await this.profileRepository.findOne({
      where: { nationalCode: nationalCode },
    });

    if (existUser) {
      throw new BadRequestException(
        'این کد ملی قبلاً برای پروفایل دیگری ثبت شده است',
      );
    }
    const profile = await this.profileRepository.findOne({
      where: { driver: { id: driverId } },
    });

    if (!profile) {
      throw new BadRequestException(
        'پروفایل یافت نشد. لطفاً ابتدا اطلاعات اولیه را ثبت کنید',
      );
    }

    if (profile.isProfileComplete) {
      throw new BadRequestException('پروفایل شما قبلاً تکمیل شده است');
    }

    profile.nationalCode = createCompletProfile.nationalCode;
    profile.medicalConditions = createCompletProfile?.medicalConditions || '';
    profile.address = createCompletProfile.address;
    profile.hasGlasses = createCompletProfile.hasGlasses;
    profile.age = createCompletProfile.age;
    profile.city = createCompletProfile.city;
    profile.isProfileComplete = true;

    const updatedProfile = await this.profileRepository.save(profile);

    return {
      message: 'پروفایل با موفقیت تکمیل شد',
      data: updatedProfile,
    };
  }
  async update(driverId: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: { driver: { id: driverId } },
    });

    if (!profile) {
      throw new BadRequestException('پروفایل یافت نشد');
    }
    Object.assign(profile, updateProfileDto);
    const updatedProfile = await this.profileRepository.save(profile);

    return {
      message: 'پروفایل با موفقیت بروزرسانی شد',
      data: updatedProfile,
    };
  }
}
