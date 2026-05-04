import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainee } from '../trainee/entities/trainee.entity';
import { CreateProfileTraineeDto } from './dto/create-profile-trainee.dto';
import { UpdateProfileTraineeDto } from './dto/update-profile-trainee.dto';

@Injectable()
export class ProfileTraineeService {
  constructor(
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
  ) {}

  async createProfile(createDto: CreateProfileTraineeDto, userId: string) {
    const existingProfile = await this.traineeRepository.findOne({
      where: { nationalCode: createDto.nationalCode },
    });

    if (existingProfile) {
      throw new BadRequestException('این کد ملی قبلاً ثبت شده است');
    }

    const existingUserProfile = await this.traineeRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingUserProfile) {
      throw new BadRequestException('شما قبلاً پروفایل خود را ثبت کرده‌اید');
    }

    const profile = this.traineeRepository.create({
      ...createDto,
      user: { id: userId },
      isProfileComplete: true,
    });

    const savedProfile = await this.traineeRepository.save(profile);

    return {
      message: 'پروفایل با موفقیت ثبت شد',
      data: savedProfile,
    };
  }

  async getProfile(userId: string) {
    const profile = await this.traineeRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!profile) {
      throw new BadRequestException('پروفایل یافت نشد');
    }

    return profile;
  }

  async updateProfile(userId: string, updateDto: UpdateProfileTraineeDto) {
    const profile = await this.traineeRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new BadRequestException('پروفایل یافت نشد');
    }

    Object.assign(profile, updateDto);
    const updatedProfile = await this.traineeRepository.save(profile);

    return {
      message: 'پروفایل با موفقیت بروزرسانی شد',
      data: updatedProfile,
    };
  }
}
