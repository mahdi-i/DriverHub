import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { DriverModule } from './modules/driver/driver.module';
import { Driver } from './modules/driver/entities/driver.entity';
import { ProfileDriver } from './modules/profile/entities/profile.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { ScheduleDriver } from './modules/schedule-driver/entities/schedule-driver.entity';
import { ScheduleDriverModule } from './modules/schedule-driver/schedule-driver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileDriver, ScheduleDriver, Driver]),
    ProfileModule,
    DriverModule,
    ScheduleDriverModule,
    AnalysisModule,
  ],
})
export class DashboardDriverModule {}
