import { User } from '@core/user/entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '@shared/services/cache.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  async generateTokens(user: User): Promise<{ authToken: string }> {
    const payload = { sub: user.id, role: user.role };

    const authToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET') as string,
      expiresIn: parseInt(
        this.configService.get('JWT_REFRESH_EXPIRY_SECONDS', '1296000'),
        10,
      ),
    });

    const ttl = this.configService.get<number>(
      'JWT_REFRESH_EXPIRY_SECONDS',
      1296000,
    );
    await this.cacheService.set(`refresh:${user.id}`, authToken, ttl);

    return { authToken };
  }
}
