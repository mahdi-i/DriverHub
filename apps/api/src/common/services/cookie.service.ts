import { Injectable } from '@nestjs/common';
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

  set(
    res: Response,
    name: string,
    value: string,
    options?: CookieOptions,
  ): void {
    const finalOptions = { ...this.defaultOptions, ...options };
    res.cookie(name, value, finalOptions);
  }
  setToken(
    res: Response,
    token: string,
    maxAge: number,
    name: string = 'licenseToken',
  ) {
    res.cookie(name, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: maxAge,
      path: '/',
    });
  }
}
