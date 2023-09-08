import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { OperationImage } from './operationimage.entity';
import { ImageSavedUser } from './saveimage.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userCreateId', nullable: true })
  userCreateId: number;

  @Column()
  linkImage: string;

  @Column()
  categoryImage: string;

  @Column()
  titleImage: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  sourceImage: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userCreateId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.image)
  imageComments: Comment[];

  @OneToMany(
    () => OperationImage,
    (imageOperation) => imageOperation.imageOperation,
  )
  imageOperations: OperationImage[];

  @OneToMany(() => ImageSavedUser, (imageSaved) => imageSaved.imageSaved)
  imageSaveds: ImageSavedUser[];
}
