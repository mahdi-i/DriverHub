import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateStartvsEndPipe implements PipeTransform {
  transform(value: any) {
    // if (value.startTime > value.endTime) {
    //   throw new BadRequestException('start time can not be after end time');
    // }
    if (value.startTime > value.endTime) {
      throw new BadRequestException('زمان شروع بعد از زمان پایان است');
    }

    // if (value.startTime && value.endTime) {
    //   if (value.startTime === value.endTime) {
    //     throw new BadRequestException(
    //       'start time and end time can not be the same',
    //     );
    //   }
    // }
    if (value.startTime && value.endTime) {
      if (value.startTime === value.endTime) {
        throw new BadRequestException(
          'زمان شروع و زمان پایان نمیتوانند مشترک باشند',
        );
      }
    }

    return value;
  }
}
