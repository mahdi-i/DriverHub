import { User } from '@core/user/entities/auth.entity';
import { UserService } from '@core/user/user.service';
import { Roles } from '@driverhub/shared-types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '@shared/services/cache.service';
import { generateOtp } from '@shared/utils/code-generator.util';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../dto/create-phone.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}
  async requestOtp(createAuthDto: CreateAuthDto) {
    const { phone } = createAuthDto;
    const rateLimitKey = `rate-limit:${phone}`;
    const isRateLimited = await this.cacheService.get(rateLimitKey);

    if (isRateLimited) {
      throw new BadRequestException(
        'لطفاً چند دقیقه صبر کنید و دوباره تلاش کنید',
      );
    }

    const attemptsKey = `attempts:${phone}`;
    const failedAttempts = await this.cacheService.get(attemptsKey);

    if (failedAttempts && parseInt(failedAttempts as string) >= 3) {
      await this.cacheService.del(`otp:${phone}`);
      await this.cacheService.del(attemptsKey);
      throw new BadRequestException(
        'تعداد تلاش‌ های ناموفق زیاد بوده است. لطفاً کد جدید درخواست کنید',
      );
    }
    await this.cacheService.del(`otp:${phone}`);

    const otp = generateOtp(6);
    await this.cacheService.set(`otp:${phone}`, otp, 120);

    await this.cacheService.set(rateLimitKey, 'true', 120);

    const existUser = await this.userService.findByPhone(phone);
    return {
      message: existUser
        ? 'کد تایید برای ورود ارسال شد'
        : 'کد تایید برای ثبت‌نام ارسال شد',
      expiresIn: 120,
      otp,
    };
  }
  async verifyOtp(verifyDto: VerifyOtpDto, roleSend: Roles) {
    const { phone, otp } = verifyDto;

    const existOtp = await this.cacheService.get(`otp:${phone}`);
    if (!existOtp) {
      throw new BadRequestException(
        'کد تایید منقضی شده است. لطفا دوباره درخواست کنید',
      );
    }
    if (existOtp !== otp.toString()) {
      const attemptsKey = `attempts:${phone}`;
      let attempts = await this.cacheService.get(attemptsKey);

      if (!attempts) {
        attempts = '1';
      } else {
        attempts = (parseInt(attempts as string) + 1).toString();
      }
      if (parseInt(attempts) >= 3) {
        await this.cacheService.del(`otp:${phone}`);
        await this.cacheService.del(attemptsKey);
        throw new BadRequestException(
          'تعداد تلاش‌ های ناموفق مجاز تمام شده است. لطفا کد جدید بگیرید',
        );
      }
      await this.cacheService.set(attemptsKey, attempts, 300);

      throw new BadRequestException('کد تایید اشتباه است');
    }
    await this.cacheService.del(`otp:${phone}`);
    await this.cacheService.del(`attempts:${phone}`);
    const user = await this.userService.findByPhone(phone);
    if (user) {
      const tokens = await this.tokenService.generateTokens(user);
      return {
        message: 'ورود با موفقیت انجام شد',
        user: {
          id: user.id,
          phone: user.phone,
          role: user.role,
        },
        ...tokens,
      };
    } else {
      let role: Roles;
      if (roleSend === Roles.TEACHER) {
        role = Roles.TEACHER;
      } else if (roleSend === Roles.TRAINEE) {
        role = Roles.TRAINEE;
      } else {
        throw new BadRequestException('نقش کاربری نامعتبر است');
      }

      const newUser = await this.userService.create({
        phone,
        role,
        isActive: true,
      });

      const tokens = await this.tokenService.generateTokens(newUser);
      return {
        message: 'ثبت‌ نام با موفقیت انجام شد',
        user: {
          id: newUser.id,
          phone: newUser.phone,
          role: newUser.role,
        },
        ...tokens,
      };
    }
  }
  async refreshTokens(refreshToken: string) {
    const tokens = await this.tokenService.refreshAccessToken(refreshToken);
    return tokens;
  }

  async logout(refreshToken: string) {
    const payload = await this.tokenService.validateRefreshToken(refreshToken);
    await this.tokenService.revokeRefreshToken(payload.sub);
  }
}
