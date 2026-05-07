import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { Roles } from '@shared/enums/role.enum';
import { AnalysisService } from './analysis.service';
import { DriverAnalysisResponseDto } from './dto/create-analysis.dto';

@Controller('analysis-driver')
@UseGuards(ProfileCompleteGuard)
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}
  @Get()
  @RolesDecorator(Roles.TEACHER, Roles.ADMIN)
  async getAnalysis(
    @UserInfo('id') driverId: string,
  ): Promise<DriverAnalysisResponseDto> {
    return this.analysisService.getAnalysis(driverId);
  }
}
