import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { Trainee } from '@core/dashboard-trainee/modules/trainee/entities/trainee.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { AppointmentStatus } from '@shared/enums/appointment-status.enum';
import { Column, JoinColumn, ManyToOne } from 'typeorm';

export class Appointment extends BaseEntity {
  @ManyToOne(() => Trainee)
  @JoinColumn({ name: 'student_id' })
  student: Trainee;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column({ default: 0 })
  score: number;

  @Column({ nullable: true })
  note: string;
}
