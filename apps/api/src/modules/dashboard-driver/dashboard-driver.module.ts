import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileCompleteGuard } from './guards/profile-complete.guard';
import { AppointmentDriverModule } from './modules/appointment-driver/appointment-driver.module';
import { ProfileDriver } from './modules/profile/entities/profile.entity';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileDriver]),
    ProfileModule,
    AppointmentDriverModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ProfileCompleteGuard,
    },
  ],
})
export class DashboardDriverModule {}
