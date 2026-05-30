import { UserModule } from '@core/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '@shared/services/file.service';
import { ProfileDriver } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileDriver]), UserModule],
  controllers: [ProfileController],
  providers: [ProfileService, FileService],
  exports: [TypeOrmModule, ProfileService],
})
export class ProfileModule {}
