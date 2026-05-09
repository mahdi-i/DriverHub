import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @Public()
  findAll(@Paginate() query: PaginateQuery, @UserInfo('id') userId: string) {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }
}
