import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateStartvsEndPipe implements PipeTransform {
  transform(value: any) {
    if (!value.startTime || !value.endTime) {
      throw new BadRequestException('زمان شروع و پایان الزامی است');
    }

    const start = new Date(`1970-01-01T${value.startTime}`);
    const end = new Date(`1970-01-01T${value.endTime}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('فرمت زمان نامعتبر است');
    }

    if (start >= end) {
      throw new BadRequestException('زمان شروع باید قبل از زمان پایان باشد.');
    }

    return value;
  }
}
