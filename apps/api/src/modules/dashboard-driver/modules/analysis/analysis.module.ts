import { Booking } from '@core/booking/entities/booking.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileDriver } from '../profile/entities/profile.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileDriver, Booking])],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
