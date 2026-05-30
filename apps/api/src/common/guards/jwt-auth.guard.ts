import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LicenseManager } from '@shared/lib/licence/licence.service';

@Injectable()
export class LicenseAuthGuard {
  constructor(
    private readonly reflector: Reflector,
    private readonly licenseManager: LicenseManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      process.env.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    let token = request.cookies?.licenseToken;

    if (!token) {
      const authHeader = request.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      throw new UnauthorizedException('لطفاً وارد شوید');
    }

    try {
      const payload = await this.licenseManager.validateLicense(token);
      request.user = {
        driverId: payload?.driverId,
        traineeId: payload?.trineeId,
        id: payload.userId,
        role: payload.role,
        expireAt: payload.expireAt,
      };
      return true;
    } catch (error) {
      if (
        error.name === 'TokenExpiredError' ||
        error.message?.includes('expired')
      ) {
        throw new UnauthorizedException('لایسنس منقضی شده است');
      }
      throw new UnauthorizedException('لایسنس نامعتبر است');
    }
  }
}
