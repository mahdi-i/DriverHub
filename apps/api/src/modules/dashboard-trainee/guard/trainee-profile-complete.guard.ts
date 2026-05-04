import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainee } from '../modules/trainee/entities/trainee.entity';

@Injectable()
export class TraineeProfileCompleteGuard implements CanActivate {
  constructor(
    @InjectRepository(Trainee)
    private traineeProfileRepository: Repository<Trainee>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipCheck = this.reflector.getAllAndOverride<boolean>(
      process.env.SKIP_TRAINEE_PROFILE_KEY,
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

    const profile = await this.traineeProfileRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!profile || !profile.isProfileComplete) {
      throw new ForbiddenException('لطفاً ابتدا پروفایل خود را تکمیل کنید');
    }

    return true;
  }
}
