import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeLoveComment } from '../database/likelovecomment.entity';

@Injectable()
export class LikeLoveCommentService {
  constructor(
    @InjectRepository(LikeLoveComment)
    private likeLoveCommentRepository: Repository<LikeLoveComment>,
  ) {}

  async findAll(): Promise<LikeLoveComment[]> {
    return this.likeLoveCommentRepository.find();
  }
  async getById(id: number): Promise<LikeLoveComment> {
    return this.likeLoveCommentRepository.findOneBy({ idLikeLoveComment: id });
  }

  async create(likeLoveComment: LikeLoveComment): Promise<LikeLoveComment> {
    return this.likeLoveCommentRepository.save(likeLoveComment);
  }

  async delete(id: number): Promise<void> {
    await this.likeLoveCommentRepository.delete(id);
  }
}
