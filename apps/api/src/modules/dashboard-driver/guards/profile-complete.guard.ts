import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileDriver } from '../modules/profile/entities/profile.entity';

@Injectable()
export class ProfileCompleteGuard implements CanActivate {
  constructor(
    @InjectRepository(ProfileDriver)
    private profileRepository: Repository<ProfileDriver>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipCheck = this.reflector.getAllAndOverride<boolean>(
      process.env.IS_PUBLIC_PROFILE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (skipCheck) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException('کاربر یافت نشد');
    }
    console.log(user, 'sadasssssssssssssssss');
    const profile = await this.profileRepository.findOne({
      where: { user: { id: user.id } },
    });
    console.log(profile, 'profile');
    if (!profile) {
      throw new ForbiddenException('لطفاً ابتدا پروفایل خود را تکمیل کنید');
    }

    return true;
  }
}
