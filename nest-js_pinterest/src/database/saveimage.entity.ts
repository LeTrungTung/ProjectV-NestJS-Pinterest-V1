import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity('images_saved_user')
export class ImageSavedUser {
  @PrimaryGeneratedColumn()
  idSaveImage: number;

  @Column({ name: 'imageSavedId', nullable: true })
  imageSavedId: number;

  @Column({ name: 'userSavedId', nullable: true })
  userSavedId: number;

  @ManyToOne(() => Image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imageSavedId' })
  imageSaved: Image;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userSavedId' })
  userSaved: User;
}
