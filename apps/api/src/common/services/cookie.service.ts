import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

@Injectable()
export class CookieService {
  private readonly defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };

  constructor(private readonly configService: ConfigService) {}

  set(
    res: Response,
    name: string,
    value: string,
    options?: CookieOptions,
  ): void {
    const finalOptions = { ...this.defaultOptions, ...options };
    res.cookie(name, value, finalOptions);
  }

  setRefreshToken(
    res: Response,
    token: string,
    expiresInDays: number = 15,
  ): void {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const maxAgeMs = expiresInDays * oneDayInMs;
    this.set(res, 'refreshToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAgeMs,
      path: '/',
    });
  }

  setAccessToken(
    res: Response,
    token: string,
    expiresInMinutes?: number,
  ): void {
    const minutes =
      expiresInMinutes ||
      this.configService.get<number>('JWT_ACCESS_EXPIRY_SECONDS', 900) / 60;
    this.set(res, 'accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: minutes * 20 * 10,
      path: '/',
    });
  }

  get(req: any, name: string): string | undefined {
    return req.cookies?.[name];
  }

  getRefreshToken(req: any): string | undefined {
    return this.get(req, 'refreshToken');
  }

  getAccessToken(req: any): string | undefined {
    return this.get(req, 'accessToken');
  }

  clear(res: Response, name: string, options?: CookieOptions): void {
    const finalOptions = { ...this.defaultOptions, ...options, maxAge: 0 };
    res.cookie(name, '', finalOptions);
  }

  clearRefreshToken(res: Response): void {
    this.clear(res, 'refreshToken');
  }

  clearAccessToken(res: Response): void {
    this.clear(res, 'accessToken');
  }

  clearAuthCookies(res: Response): void {
    this.clearRefreshToken(res);
    this.clearAccessToken(res);
  }
}
