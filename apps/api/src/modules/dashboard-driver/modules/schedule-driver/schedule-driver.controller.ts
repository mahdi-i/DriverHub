import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import { Roles } from '@driverhub/shared-types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaginationOptions } from '@shared/decorators/pagination-option.decorator';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateScheduleDriverDto } from './dto/create-schedule-driver.dto';
import { UpdateScheduleDriverDto } from './dto/update-schedule-driver.dto';
import { CheckOneShiftPipe } from './pipe/check-has-one-shift.pipe';
import { NoOverlapPipe } from './pipe/no-overlap-shift.pipe';
import { ScheduleDriverService } from './schedule-driver.service';

@Controller('schedule-driver')
@UseGuards(ProfileCompleteGuard)
export class ScheduleDriverController {
  constructor(private readonly scheduleDriverService: ScheduleDriverService) {}

  @Post('set-schedule')
  @RolesDecorator(Roles.TEACHER)
  create(
    @Body(CheckOneShiftPipe, NoOverlapPipe)
    createScheduleDriverDto: CreateScheduleDriverDto,
    @UserInfo('id') userId: string,
  ) {
    return this.scheduleDriverService.create(createScheduleDriverDto, userId);
  }

  @Get('filter-my-schedule')
  @RolesDecorator(Roles.TEACHER)
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [{ field: 'dayOfWeek', example: 'MONDAY' }],
    searchOptions: [{ field: 'search-dayOfWeek', example: 'MONDAY' }],
  })
  findAll(@UserInfo('id') userId: string, @Paginate() query: PaginateQuery) {
    return this.scheduleDriverService.findAll(userId, query);
  }

  @Get(':id')
  @RolesDecorator(Roles.TEACHER)
  findOne(@Param('id') id: string, @UserInfo('id') userId: string) {
    return this.scheduleDriverService.findOne(id, userId);
  }

  @Put(':id')
  @RolesDecorator(Roles.TEACHER)
  update(
    @Param('id') id: string,
    @Body() updateScheduleDriverDto: UpdateScheduleDriverDto,
    @UserInfo('id') userId: string,
  ) {
    return this.scheduleDriverService.update(
      id,
      updateScheduleDriverDto,
      userId,
    );
  }

  @Delete(':id')
  @RolesDecorator(Roles.TEACHER)
  remove(@Param('id') id: string, @UserInfo('id') userId: string) {
    return this.scheduleDriverService.remove(id, userId);
  }
}
