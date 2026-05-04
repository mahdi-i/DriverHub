import { User } from '@core/user/entities/auth.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { GenderEnum } from '@shared/enums/gender.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 10 })
  postalCode: string;

  @Column({ default: false })
  isProfileComplete: boolean;
}
