import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { Trainee } from '@core/dashboard-trainee/modules/trainee/entities/trainee.entity';
import { AppointmentStatus } from '@driverhub/shared-types';
import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('bookings')
@Index(['driver', 'startTime', 'endTime'])
export class Booking extends BaseEntity {
  @ManyToOne(() => Trainee, { nullable: true })
  @JoinColumn()
  student: Trainee;

  @ManyToOne(() => Driver, { nullable: true })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'int', nullable: true })
  score?: number;

  @Column({ type: 'timestamp', name: 'confirmed_at', nullable: true })
  confirmedAt?: Date;
}
