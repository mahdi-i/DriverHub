import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateScheduleDriverDto } from './dto/create-schedule-driver.dto';
import { UpdateScheduleDriverDto } from './dto/update-schedule-driver.dto';
import { ScheduleDriverService } from './schedule-driver.service';

@Controller('schedule-driver')
export class ScheduleDriverController {
  constructor(private readonly scheduleDriverService: ScheduleDriverService) {}

  @Post()
  create(@Body() createScheduleDriverDto: CreateScheduleDriverDto) {
    return this.scheduleDriverService.create(createScheduleDriverDto);
  }

  @Get()
  findAll() {
    return this.scheduleDriverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleDriverService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDriverDto: UpdateScheduleDriverDto,
  ) {
    return this.scheduleDriverService.update(+id, updateScheduleDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleDriverService.remove(+id);
  }
}
