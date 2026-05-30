import { Roles } from '@driverhub/shared-types';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { MaxAge_License } from '@shared/constants/jwt.constants';
import { Public } from '@shared/decorators/public.decorator';
import { CookieService } from '@shared/services/cookie.service';
import { Response } from 'express';
import { CreateAuthDto } from '../dto/create-phone.dto';
import { LoginOwnerDto } from '../dto/login-owner.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('request-otp')
  @Public()
  async requestOtp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.requestOtp(createAuthDto);
  }

  @Post('verify-otp/trainee')
  @Public()
  async verifyOtpForTrainee(
    @Body() verifyDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOtp(verifyDto, Roles.TRAINEE);

    this.cookieService.setToken(
      res,
      result.license,
      MaxAge_License,
      'licenseToken',
    );
    console.log('2');
    console.log('first');
    console.log(result.message);

    return {
      message: result.message,
      user: result.user.id,
    };
  }

  @Post('verify-otp/teacher')
  @Public()
  async verifyOtpForTeacher(
    @Body() verifyDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOtp(verifyDto, Roles.TEACHER);

    this.cookieService.setToken(
      res,
      result.license,
      MaxAge_License,
      'licenseToken',
    );

    return {
      message: result.message,
      user: result.user.id,
    };
  }

  @Post('admin/login')
  @Public()
  async adminLogin(
    @Body() dto: LoginOwnerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.loginOwner(dto);

    this.cookieService.setToken(
      res,
      result.license,
      MaxAge_License,
      'licenseToken',
    );

    return {
      message: result.message,
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('licenseToken', {
      path: '/',
      sameSite: 'lax',
      secure: false,
    });

    return { message: 'با موفقیت خارج شدید' };
  }
}
