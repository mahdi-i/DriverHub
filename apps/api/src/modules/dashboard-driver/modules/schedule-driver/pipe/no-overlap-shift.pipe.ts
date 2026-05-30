import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ShiftWork } from '../types/shift.type';

@Injectable()
export class NoOverlapPipe implements PipeTransform {
  transform(value: ShiftWork) {
    const { startTimeFirst, endTimeFirst, startTimeSecond, endTimeSecond } =
      value;
    const toMinutes = (timeStr: string): number => {
      if (!timeStr) return 0;
      const [hour, min] = timeStr.split(':').map(Number);
      return hour * 60 + min;
    };
    const start1 = toMinutes(startTimeFirst);
    const end1 = toMinutes(endTimeFirst);
    const start2 = toMinutes(startTimeSecond);
    const end2 = toMinutes(endTimeSecond);

    if (startTimeFirst && endTimeFirst && end1 <= start1) {
      throw new BadRequestException(
        'زمان پایان شیفت اول نباید قبل یا مساوی زمان شروع آن باشد',
      );
    }

    if (startTimeSecond && endTimeSecond && end2 <= start2) {
      throw new BadRequestException(
        'زمان پایان شیفت دوم نباید قبل یا مساوی زمان شروع آن باشد',
      );
    }
    if (startTimeFirst && endTimeFirst && startTimeSecond && endTimeSecond) {
      const hasOverlap = start1 < end2 && start2 < end1;

      if (hasOverlap) {
        throw new BadRequestException('شیفت‌های کاری با هم تداخل دارند');
      }
    }
    return value;
  }
}
