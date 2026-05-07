import { BaseEntity } from '@shared/entities/base.entity';
import { DaysOfWeek } from '@shared/enums/week-day.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
@Entity()
export class ScheduleDriver extends BaseEntity {
  @Column({ name: 'driver_id' })
  driverId: string;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ type: 'enum', enum: DaysOfWeek })
  dayOfWeek: DaysOfWeek;

  @Column({ type: 'time', nullable: true })
  startTimeFirst?: string;

  @Column({ type: 'time', nullable: true })
  endTimeFirst?: string;

  @Column({ type: 'time', nullable: true })
  startTimeSecond?: string;

  @Column({ type: 'time', nullable: true })
  endTimeSecond?: string;
}
