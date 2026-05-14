import { DriverModule } from '@core/dashboard-driver/modules/driver/driver.module';
import { ProfileModule } from '@core/dashboard-driver/modules/profile/profile.module';
import { ProfileTraineeModule } from '@core/dashboard-trainee/modules/profile-trainee/profile-trainee.module';
import { TraineeModule } from '@core/dashboard-trainee/modules/trainee/trainee.module';
import { UserModule } from '@core/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { SupportController } from './support.controller';
import { SupportGateway } from './support.gateway';
import { SupportService } from './support.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Support]),
    UserModule,
    DriverModule,
    TraineeModule,
    ProfileModule,
    ProfileTraineeModule,
  ],
  controllers: [SupportController],
  providers: [SupportService, SupportGateway],
  exports: [SupportService],
})
export class SupportModule {}
