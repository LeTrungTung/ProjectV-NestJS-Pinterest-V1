import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeLoveComment } from '../database/likelovecomment.entity';
import { LikeLoveCommentController } from './likelovecomment.controller';
import { LikeLoveCommentService } from './likelovecomment.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikeLoveComment])],
  controllers: [LikeLoveCommentController],
  providers: [LikeLoveCommentService],
})
export class LikeLoveCommentModule {}
