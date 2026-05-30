import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import { Roles } from '@driverhub/shared-types';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { AnalysisService } from './analysis.service';
import { DriverAnalysisResponseDto } from './dto/create-analysis.dto';

@Controller('analysis-driver')
@UseGuards(ProfileCompleteGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}
  @Get()
  @RolesDecorator(Roles.TEACHER, Roles.ADMIN)
  async getAnalysis(
    @UserInfo('driverId') driverId: string,
  ): Promise<DriverAnalysisResponseDto> {
    return this.analysisService.getAnalysis(driverId);
  }
}
