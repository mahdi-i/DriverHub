import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ShiftWork } from '../types/shift.type';

@Injectable()
export class NoOverlapPipe implements PipeTransform {
  transform(value: ShiftWork) {
    const { startTimeFirst, endTimeFirst, startTimeSecond, endTimeSecond } =
      value;
    if (
      !startTimeFirst ||
      !endTimeFirst ||
      !startTimeSecond ||
      !endTimeSecond
    ) {
      return value;
    }

    const toMinutes = (timeStr: string): number => {
      const [hour, min] = timeStr.split(':').map(Number);
      return hour * 60 + min;
    };

    const start1 = toMinutes(startTimeFirst);
    const end1 = toMinutes(endTimeFirst);
    const start2 = toMinutes(startTimeSecond);
    const end2 = toMinutes(endTimeSecond);
    const overlap = start1 < end2 && start2 < end1;
    if (overlap) {
      throw new BadRequestException('شیفت های کاری باهم تداخل دارند');
    }

    return value;
  }
}
