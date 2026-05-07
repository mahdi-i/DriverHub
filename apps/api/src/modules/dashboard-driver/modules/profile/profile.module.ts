import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '@shared/services/file.service';
import { ProfileDriver } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileDriver])],
  controllers: [ProfileController],
  providers: [ProfileService, FileService],
  exports: [TypeOrmModule],
})
export class ProfileModule {}
