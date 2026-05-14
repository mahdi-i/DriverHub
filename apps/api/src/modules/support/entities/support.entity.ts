import { User } from '@core/user/entities/auth.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Support extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  receiver: User;

  @Column('text')
  content: string;

  @Column({ default: false })
  isRead: boolean;
}
