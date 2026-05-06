import { User } from '@core/user/entities/auth.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { GenderEnum } from '@shared/enums/gender.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
import { LicenseTypeEnum } from '@shared/enums/license-type.enum';

@Entity()
export class ProfileDriver extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @Column()
  fullName: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @Column({ unique: true })
  licenseNumber: string;

  @Column({ default: 0 })
  experienceYears: number;

  @Column({ nullable: true })
  carModel: string;

  @Column({ nullable: true })
  carColor: string;

  @Column({ unique: true, nullable: true })
  bankAccountNumber: string;

  @Column({ nullable: true })
  certificateUrl: string;

  @Column({ nullable: false })
  age: number;

  @Column({ unique: true, nullable: false })
  nationalCode: number;

  @Column({ nullable: false })
  hasGlasses: boolean;

  @Column({ nullable: false })
  medicalConditions: string;

  @Column({ nullable: false })
  address: string;

  @Column({
    type: 'enum',
    enum: LicenseTypeEnum,
    default: LicenseTypeEnum.CAR,
  })
  licenseType: LicenseTypeEnum;

  @Column({ default: false })
  isProfileComplete: boolean;
}
