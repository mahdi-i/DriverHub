import { BaseEntity } from '@shared/entities/base.entity';
import { DaysOfWeek } from '@shared/enums/week-day.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
@Entity()
export class ScheduleDriver extends BaseEntity {
  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ type: 'enum', enum: DaysOfWeek })
  dayOfWeek: DaysOfWeek;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'int', default: 60 })
  slotDuration: number;

  @Column({ default: true })
  isActive: boolean;
}
