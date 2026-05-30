import { ProfileCompleteGuard } from '@core/dashboard-driver/guards/profile-complete.guard';
import { TraineeProfileCompleteGuard } from '@core/dashboard-trainee/guard/trainee-profile-complete.guard';
import { Roles } from '@driverhub/shared-types';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaginationOptions } from '@shared/decorators/pagination-option.decorator';
import { Public } from '@shared/decorators/public.decorator';
import { RolesDecorator } from '@shared/decorators/roles.decorator';
import { UserInfo } from '@shared/decorators/user.decorator';
import { ValidateStartvsEndPipe } from '@shared/pipes/compare-start-vs-end.pipe';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { BookingService } from '../services/booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(TraineeProfileCompleteGuard)
  create(
    @Body(ValidateStartvsEndPipe) dto: CreateBookingDto,
    @UserInfo('traineeId') traineeId: string,
  ) {
    return this.bookingService.create(dto, traineeId);
  }

  @Get('filter-booking')
  @Public()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'licenseType', example: 'CAR' },
      { field: 'gender', example: 'MALE' },
      { field: 'experienceYears', example: '2' },
      { field: 'age[$gte]', example: '25' },
      { field: 'age[$lte]', example: '50' },
      { field: 'startTime', example: '$eq:14:00' },
      { field: 'endTime', example: '$eq:16:00' },
      { field: 'dayOfWeek', example: 'MONDAY' },
    ],
    searchOptions: [
      { field: 'profile.fullName', example: 'علی' },
      { field: 'profile.carModel', example: 'پراید' },
    ],
  })
  filterBooking(@Paginate() query: PaginateQuery) {
    return this.bookingService.filterBooking(query);
  }

  @Get('drivers-filter-list')
  @Public()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }],
    filterOptions: [
      { field: 'filter[profile.licenseType][$eq]', example: 'CAR' },
      { field: 'filter[profile.gender][$eq]', example: 'MALE' },
      { field: 'filter[profile.experienceYears][$gte]', example: '2' },
      { field: 'filter[profile.age][$gte]', example: '25' },
      { field: 'filter[profile.age][$lte]', example: '50' },
    ],
    searchOptions: [
      { field: 'profile.fullName', example: 'علی' },
      { field: 'profile.carModel', example: 'پراید' },
    ],
  })
  driversList(@Paginate() query: PaginateQuery) {
    return this.bookingService.driversList(query);
  }

  @Get('my-list-trainee')
  @UseGuards(TraineeProfileCompleteGuard)
  @PaginationOptions({
    filterOptions: [{ field: 'status', example: 'PENDING' }],
  })
  findMyRequests(
    @Paginate() query: PaginateQuery,
    @UserInfo('id') traineeId: string,
  ) {
    return this.bookingService.findAllForTrainee(query, traineeId);
  }

  @Get('incoming-requests')
  @RolesDecorator(Roles.TEACHER)
  @UseGuards(ProfileCompleteGuard)
  @PaginationOptions({
    filterOptions: [
      { field: 'status', example: 'pending' },
      { field: 'student.gender', example: 'MALE' },
    ],
    searchOptions: [{ field: 'student.fullName', example: 'علی' }],
  })
  findIncomingRequests(
    @Paginate() query: PaginateQuery,
    @UserInfo('driverId') driverId: string,
  ) {
    return this.bookingService.findAllForDriver(query, driverId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserInfo('id') userId: string) {
    return this.bookingService.findOne(id, userId);
  }

  @Put(':id')
  @RolesDecorator(Roles.TEACHER)
  @UseGuards(ProfileCompleteGuard)
  update(
    @Param('id') id: string,
    @UserInfo('driverId') driverId: string,
    @Body() dto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, driverId, dto);
  }
}
