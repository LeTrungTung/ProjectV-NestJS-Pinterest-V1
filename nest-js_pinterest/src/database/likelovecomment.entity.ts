import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('like_love_comment')
export class LikeLoveComment {
  @PrimaryGeneratedColumn()
  idLikeLoveComment: number;

  @Column({ name: 'commentLikeLoveId' })
  commentLikeLoveId: number;

  @Column({ name: 'userLikeCommentId', nullable: true })
  userLikeCommentId: number;

  @Column({ name: 'userLoveCommentId', nullable: true })
  userLoveCommentId: number;

  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentLikeLoveId' })
  commentLikeLove: Comment;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userLikeCommentId' })
  userLikeComment: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userLoveCommentId' })
  userLoveComment: User;
}
