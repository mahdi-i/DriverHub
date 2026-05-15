import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '@shared/config/typeorm.config';
import { LicenseAuthGuard } from '@shared/guards/jwt-auth.guard';
import { RolesGuard } from '@shared/guards/rolse.guard';
import { LicenseModule } from '@shared/lib/licence/licence.module';
import { AppCacheModule } from '@shared/modules/cache.module';
import { CookieModule } from '@shared/modules/cookie.module';
import { FileModule } from '@shared/modules/file.module';
import { RedisModule } from '@shared/modules/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { DashboardAdminModule } from './modules/dashboard-admin/dashboard-admin.module';
import { DashboardDriverModule } from './modules/dashboard-driver/dashboard-driver.module';
import { DashboardTraineeModule } from './modules/dashboard-trainee/dashboard-trainee.module';
import { SupportModule } from './modules/support/support.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_ACCESS_EXPIRY),
      },
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    RedisModule.forRootAsync(),
    AppCacheModule,
    AuthModule,
    UserModule,
    CookieModule,
    FileModule,
    DashboardDriverModule,
    DashboardAdminModule,
    DashboardTraineeModule,
    BookingModule,
    SupportModule,
    LicenseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LicenseAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
