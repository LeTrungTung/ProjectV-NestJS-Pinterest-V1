import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../database/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Image } from 'src/database/image.entity';
import { User } from 'src/database/user.entity';
import { LikeLoveComment } from 'src/database/likelovecomment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, LikeLoveComment, Image])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
