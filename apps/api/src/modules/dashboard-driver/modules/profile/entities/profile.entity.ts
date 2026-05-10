import { User } from '@core/user/entities/auth.entity';
import { GenderEnum, LicenseTypeEnum } from '@driverhub/shared-types';
import { BaseEntity } from '@shared/entities/base.entity';
import { IranProvinceEnum } from '@shared/enums/iran-province.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';

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

  @Column({ unique: false })
  licenseNumber: string;

  @Column({ default: 0 })
  experienceYears: number;

  @Column({ nullable: false })
  carModel: string;

  @Column({ nullable: false })
  carColor: string;

  @Column({ unique: true, nullable: false })
  bankAccountNumber: string;

  @Column({ nullable: false })
  certificateUrl: string;

  @Column({ nullable: true })
  age: number;

  @Column({ unique: true, nullable: true })
  nationalCode: string;

  @Column({ nullable: true })
  hasGlasses: boolean;

  @Column({ nullable: true })
  medicalConditions: string;

  @Column({
    type: 'enum',
    enum: IranProvinceEnum,
    nullable: true,
  })
  address: IranProvinceEnum;

  @Column({ nullable: true })
  city: string;

  @Column({
    type: 'enum',
    enum: LicenseTypeEnum,
    default: LicenseTypeEnum.CAR,
  })
  licenseType: LicenseTypeEnum;

  @Column({ default: false })
  isProfileComplete: boolean;
}
