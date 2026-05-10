import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ShiftWork } from '../types/shift.type';

@Injectable()
export class CheckOneShiftPipe implements PipeTransform {
  transform(value: ShiftWork) {
    const hasShift1 = value.startTimeFirst && value.endTimeFirst;
    const hasShift2 = value.startTimeSecond && value.endTimeSecond;
    if (!hasShift1 && !hasShift2) {
      throw new BadRequestException('حداقل یکی از شیفت های کاری را وارد کنید');
    }
    return value;
  }
}
