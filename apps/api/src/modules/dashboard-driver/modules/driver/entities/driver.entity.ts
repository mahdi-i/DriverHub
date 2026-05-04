import { AppointmentRequest } from '@core/dashboard-trainee/modules/appointment-requests/entities/appointment-request.entity';
import { User } from '@core/user/entities/auth.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProfileDriver } from '../../profile/entities/profile.entity';
import { ScheduleDriver } from '../../schedule-driver/entities/schedule-driver.entity';

@Entity()
export class Driver extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => ProfileDriver)
  @JoinColumn()
  profile: ProfileDriver;

  @OneToMany(() => ScheduleDriver, (schedule) => schedule.driver)
  schedules: ScheduleDriver[];

  @OneToMany(() => AppointmentRequest, (req) => req.driver)
  requests: AppointmentRequest[];
}
