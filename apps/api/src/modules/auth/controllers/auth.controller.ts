import { Roles } from '@driverhub/shared-types';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Cookie } from '@shared/decorators/cookie.decorator';
import { Public } from '@shared/decorators/public.decorator';
import { CookieService } from '@shared/services/cookie.service';
import { Request, Response } from 'express';
import { CreateAuthDto } from '../dto/create-phone.dto';
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
  async requestOtp(@Body() phone: CreateAuthDto) {
    return this.authService.requestOtp(phone);
  }

  @Post('verify-otp/trainee')
  @Public()
  async verifyOtpForTrainee(
    @Body() verifyDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOtp(verifyDto, Roles.TRAINEE);

    this.cookieService.setRefreshToken(res, result.refreshToken, 15);
    this.cookieService.setAccessToken(res, result.accessToken);
    return {
      message: result.message,
      user: result.user,
    };
  }

  @Post('verify-otp/teacher')
  @Public()
  async verifyOtpForTeacher(
    @Body() verifyDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOtp(verifyDto, Roles.TEACHER);
    this.cookieService.setRefreshToken(res, result.refreshToken, 15);
    this.cookieService.setAccessToken(res, result.accessToken);
    return {
      message: result.message,
      user: result.user,
    };
  }

  @Post('refresh')
  @Public()
  async refreshTokens(
    @Cookie('refreshToken') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('refresh token received:', token);
    const result = await this.authService.refreshTokens(token);
    if (!result) {
      throw new UnauthorizedException('رفرش توکن یافت نشد');
    }
    console.log('refresh result:', result);
    this.cookieService.setRefreshToken(res, result.refreshToken, 15);

    this.cookieService.setAccessToken(res, result.accessToken);
    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = this.cookieService.getRefreshToken(req);
    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    this.cookieService.clearRefreshToken(res);

    return { message: 'با موفقیت خارج شدید' };
  }
}
