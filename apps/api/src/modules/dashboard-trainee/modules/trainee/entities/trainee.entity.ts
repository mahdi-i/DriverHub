import { Booking } from '@core/booking/entities/booking.entity';
import { User } from '@core/user/entities/auth.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { GenderEnum } from '@shared/enums/gender.enum';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import { LicenseTypeEnum } from '@shared/enums/license-type.enum';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Trainee extends BaseEntity {
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  fullName: string;

  @Column({ unique: true })
  nationalCode: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @Column({ default: false })
  hasGlasses: boolean;

  @Column({ type: 'text', nullable: true })
  medicalConditions: string;

  @Column({
    type: 'enum',
    enum: IranProvinceEnum,
    nullable: true,
  })
  address: IranProvinceEnum;

  @Column({ nullable: true })
  city: string;

  @Column({ length: 10 })
  postalCode: string;

  @Column({
    type: 'enum',
    enum: LicenseTypeEnum,
    nullable: true,
  })
  desiredLicenseType: LicenseTypeEnum;

  @OneToMany(() => Booking, (booking) => booking.student)
  bookings: Booking[];

  @Column({ default: false })
  isProfileComplete: boolean;
}
