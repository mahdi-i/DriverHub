import { UserService } from '@core/user/user.service';
import { Roles } from '@driverhub/shared-types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MaxAge_License } from '@shared/constants/jwt.constants';
import { LicenseManager } from '@shared/lib/licence/licence.service';
import { CacheService } from '@shared/services/cache.service';
import { generateOtp } from '@shared/utils/code-generator.util';
import { CreateAuthDto } from '../dto/create-phone.dto';
import { LoginOwnerDto } from '../dto/login-owner.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
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
    console.log('3');

    const existOtp = await this.cacheService.get(`otp:${phone}`);
    if (!existOtp) {
      throw new BadRequestException(
        'کد تایید منقضی شده است. لطفا دوباره درخواست کنید',
      );
    }
    console.log('4');

    if (existOtp !== otp.toString()) {
      const attemptsKey = `attempts:${phone}`;
      let attempts = await this.cacheService.get(attemptsKey);
      console.log('5');

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
    console.log('6');

    await this.cacheService.del(`otp:${phone}`);
    await this.cacheService.del(`attempts:${phone}`);

    const manager = new LicenseManager();
    const now = new Date();
    const expireAt = new Date(now.getTime() + MaxAge_License).toISOString();
    console.log(MaxAge_License, 'MaxAge_License');
    const user = await this.userService.findByPhone(phone);

    if (user) {
      const payload = manager.buildPayload({
        userId: Number(user.id),
        role: user.role,
        expireAt,
      });
      console.log('8');
      const licenseToken = await manager.createLicense(payload);
      console.log(licenseToken, 'token');

      return {
        message: 'ورود با موفقیت انجام شد',
        user: {
          id: user.id,
          phone: user.phone,
          role: user.role,
        },
        license: licenseToken,
      };
    } else {
      console.log('9');

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
      console.log('10');

      const payload = manager.buildPayload({
        userId: Number(newUser.id),
        role: newUser.role,
        expireAt,
      });
      console.log('11');
      const licenseToken = await manager.createLicense(payload);
      console.log(licenseToken, 'out token side');

      return {
        message: 'ثبت‌ نام با موفقیت انجام شد',
        user: {
          id: newUser.id,
          phone: newUser.phone,
          role: newUser.role,
        },
        license: licenseToken,
      };
    }
  }

  async loginOwner(dto: LoginOwnerDto) {
    if (dto.username != this.configService.get<string>('OWNER_USERNAME'))
      throw new UnauthorizedException('نام کاربری ادمین اشتباه است');
    if (dto.password != this.configService.get<string>('OWNER_PASSWORD'))
      throw new UnauthorizedException('رمز عبور ادمین اشتباه است');
    if (
      dto.secondPassword != this.configService.get<string>('OWNER_PASSWORD_X')
    )
      throw new UnauthorizedException('رمز عبور دوم ادمین اشتباه است');

    const manager = new LicenseManager();

    const expireAt = new Date(
      Date.now() + 15 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const adminUserId = crypto.randomUUID();

    const payload = manager.buildPayload({
      userId: Number(adminUserId),
      role: Roles.ADMIN,
      expireAt,
    });
    const license = await manager.createLicense(payload);
    return {
      message: 'ورود ادمین با موفقیت انجام شد',
      license: license,
    };
  }

  async logout() {}
}
