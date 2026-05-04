import { Driver } from '@core/dashboard-driver/modules/driver/entities/driver.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { RequestStatus } from '@shared/enums/request-status.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Trainee } from '../../trainee/entities/trainee.entity';

@Entity()
export class AppointmentRequest extends BaseEntity {
  @ManyToOne(() => Trainee)
  @JoinColumn({ name: 'student_id' })
  student: Trainee;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ type: 'date' })
  requestedDate: Date;

  @Column({ type: 'time' })
  requestedTime: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;
}
