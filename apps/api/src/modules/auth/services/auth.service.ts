import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { Trainee } from '@core/dashboard-trainee/modules/trainee/entities/trainee.entity';
import { User } from '@core/user/entities/auth.entity';
import { UserService } from '@core/user/user.service';
import { Roles } from '@driverhub/shared-types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MaxAge_License } from '@shared/constants/jwt.constants';
import { LicenseManager } from '@shared/lib/licence/licence.service';
import { CacheService } from '@shared/services/cache.service';
import { generateOtp } from '@shared/utils/code-generator.util';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../dto/create-phone.dto';
import { LoginOwnerDto } from '../dto/login-owner.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly licenseManager: LicenseManager,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
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

    const now = new Date();
    const expireAt = new Date(now.getTime() + MaxAge_License).toISOString();
    const user = await this.userService.findByPhone(phone);

    if (user) {
      const payload = this.licenseManager.buildPayload({
        userId: user.id,
        role: user.role,
        expireAt,
      });
      const licenseToken = await this.licenseManager.createLicense(payload);
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
      let newUser: User;
      let driverId: string | undefined;
      let traineeId: string | undefined;

      newUser = await this.userService.create({
        phone,
        role: roleSend,
        isActive: true,
      });

      if (roleSend === Roles.TRAINEE) {
        const newTrainee = this.traineeRepository.create({
          user: newUser,
        });
        console.log(newTrainee, 'newTrainee');
        const savedTrainee = await this.traineeRepository.save(newTrainee);
        traineeId = savedTrainee.id;
      } else if (roleSend === Roles.TEACHER) {
        const newDriver = this.driverRepository.create({
          user: newUser,
        });
        console.log(newDriver, 'zxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        const savedDriver = await this.driverRepository.save(newDriver);
        console.log(
          savedDriver,
          'zxxxxxxسیشسیشسیxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        );
        driverId = savedDriver.id;
      }

      const payload = this.licenseManager.buildPayload({
        userId: newUser.id,
        role: newUser.role,
        expireAt,
        driverId: driverId,
        trineeId: traineeId,
      });
      const licenseToken = await this.licenseManager.createLicense(payload);
      console.log(payload, 'yyyyyyyyyyyyyyyyyyyyy');
      return {
        message: 'ثبت‌ نام با موفقیت انجام شد',
        user: { id: newUser.id, phone: newUser.phone, role: newUser.role },
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

    const expireAt = new Date(
      Date.now() + 15 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const adminUserId = crypto.randomUUID();

    const payload = this.licenseManager.buildPayload({
      userId: adminUserId,
      role: Roles.ADMIN,
      expireAt,
    });
    const license = await this.licenseManager.createLicense(payload);
    return {
      message: 'ورود ادمین با موفقیت انجام شد',
      license: license,
    };
  }

  async logout() {}
}
