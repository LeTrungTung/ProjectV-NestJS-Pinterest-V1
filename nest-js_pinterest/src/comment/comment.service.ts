import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../database/comment.entity';
import { LikeLoveComment } from 'src/database/likelovecomment.entity';
import { User } from 'src/database/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(LikeLoveComment)
    private likeLoveCommentRepository: Repository<LikeLoveComment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment | undefined> {
    return this.commentRepository.findOneBy({ idComment: id });
  }

  async create(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async update(id: number, comment: Comment): Promise<Comment | undefined> {
    await this.commentRepository.update(id, comment);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async getLoveComments(): Promise<LikeLoveComment[]> {
    return this.likeLoveCommentRepository
      .createQueryBuilder('llc')
      .innerJoinAndSelect('llc.commentLikeLove', 'comment')
      .innerJoinAndSelect('llc.userLoveComment', 'user')
      .getMany();
  }

  async getLikeComments(): Promise<LikeLoveComment[]> {
    return this.likeLoveCommentRepository
      .createQueryBuilder('llc')
      .innerJoinAndSelect('llc.commentLikeLove', 'comment')
      .innerJoinAndSelect('llc.userLikeComment', 'user')
      .getMany();
  }

  async getAllComments(): Promise<Comment[]> {
    const combineResult = await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect(
        'comment.image',
        'image',
        'image.id = comment.idComment',
      )
      .innerJoinAndSelect(
        'comment.commentLikeLoves',
        'like_love_comment',
        'comment.idComment = like_love_comment.commentLikeLoveId',
      )
      .leftJoinAndSelect('like_love_comment.userLikeComment', 'userLikeComment')
      .leftJoinAndSelect('like_love_comment.userLoveComment', 'userLoveComment')
      .where(
        'like_love_comment.userLoveComment IS NULL AND userLikeComment.id IS NOT NULL',
      )
      .orWhere(
        'like_love_comment.userLikeComment IS NULL AND userLoveComment.id IS NOT NULL',
      )
      .getMany();

    return combineResult;
  }
}
