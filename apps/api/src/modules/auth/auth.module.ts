import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { Trainee } from '@core/dashboard-trainee/modules/trainee/entities/trainee.entity';
import { User } from '@core/user/entities/auth.entity';
import { UserService } from '@core/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseManager } from '@shared/lib/licence/licence.service';
import { CacheService } from '@shared/services/cache.service';
import { CookieService } from '@shared/services/cookie.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver, Trainee])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    TokenService,
    CacheService,
    LicenseManager,
    CookieService,
  ],
})
export class AuthModule {}
