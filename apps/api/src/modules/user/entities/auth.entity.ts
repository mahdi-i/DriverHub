import { Roles } from '@driverhub/shared-types';
import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  phone: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.TRAINEE,
  })
  role: Roles;
}
