import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { OperationImage } from './operationimage.entity';
import { ImageSavedUser } from './saveimage.entity';
import { LikeLoveComment } from './likelovecomment.entity';
import { Follow } from './follow.entity';

@Entity('users')
@Check(`"role" IN (1, 2)`)
@Check(`"status" IN (0, 1)`)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Transform((username) => username.value.toUpperCase())
  @Column({ type: 'varchar', length: 45 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ default: 2 })
  role: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  userComments: Comment[];

  @OneToMany(
    () => OperationImage,
    (userLoveImage) => userLoveImage.userLoveImage,
  )
  userLoveImages: OperationImage[];

  @OneToMany(
    () => OperationImage,
    (userLikeImage) => userLikeImage.userLikeImage,
  )
  userLikeImages: OperationImage[];

  @OneToMany(() => ImageSavedUser, (userSaved) => userSaved.userSaved)
  userSaveds: ImageSavedUser[];

  @OneToMany(
    () => LikeLoveComment,
    (userLoveComment) => userLoveComment.userLoveComment,
  )
  userLoveComments: LikeLoveComment[];

  @OneToMany(
    () => LikeLoveComment,
    (userLikeComment) => userLikeComment.userLikeComment,
  )
  userLikeComments: LikeLoveComment[];

  @OneToMany(() => Follow, (userFollowedby) => userFollowedby.userFollowedby)
  userFollowedbys: Follow[];

  @OneToMany(() => Follow, (userFollowOther) => userFollowOther.userFollowOther)
  userFollowOthers: Follow[];
}
