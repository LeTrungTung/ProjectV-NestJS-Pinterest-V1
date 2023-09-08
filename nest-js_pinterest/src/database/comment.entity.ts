import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from './user.entity';
import { LikeLoveComment } from './likelovecomment.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  idComment: number;

  @Column({ name: 'parentCommentId', nullable: true }) // Thêm cột parentCommentId
  parentCommentId: number | null; // Kiểu dữ liệu có thể là số hoặc NULL

  @Column({ name: 'imageCommentId', nullable: true })
  imageCommentId: number;

  @Column({ name: 'userCommentId', nullable: true })
  userCommentId: number;

  @Column('text')
  content: string;

  @Column({ type: 'date', name: 'timecreate', nullable: true })
  timecreate: Date;

  @ManyToOne(() => Image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imageCommentId' })
  image: Image;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userCommentId' })
  user: User;

  @OneToMany(
    () => LikeLoveComment,
    (commentLikeLove) => commentLikeLove.commentLikeLove,
  )
  commentLikeLoves: LikeLoveComment[];
}
