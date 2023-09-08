import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  idFollow: number;

  @Column({ name: 'userFollowedbyId', nullable: true })
  userFollowedbyId: number;

  @Column({ name: 'userFollowOtherId', nullable: true })
  userFollowOtherId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userFollowedbyId' })
  userFollowedby: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userFollowOtherId' })
  userFollowOther: User;
}
