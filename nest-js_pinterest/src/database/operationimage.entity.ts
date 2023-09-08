import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity('operation_image')
export class OperationImage {
  @PrimaryGeneratedColumn()
  idOperationImage: number;

  @Column({ name: 'imageOperationId', nullable: true })
  imageOperationId: number;

  @Column({ name: 'userLikeImageId', nullable: true })
  userLikeImageId: number;

  @Column({ name: 'userLoveImageId', nullable: true })
  userLoveImageId: number;

  @ManyToOne(() => Image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imageOperationId' })
  imageOperation: Image;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userLikeImageId' })
  userLikeImage: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userLoveImageId' })
  userLoveImage: User;
}
