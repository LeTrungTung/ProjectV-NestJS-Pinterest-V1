import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { LikeLoveCommentService } from './likelovecomment.service';
import { LikeLoveComment } from '../database/likelovecomment.entity';

@Controller('api/v1/like-love-comment')
export class LikeLoveCommentController {
  constructor(
    private readonly likeLoveCommentService: LikeLoveCommentService,
  ) {}

  @Get()
  async findAll(): Promise<LikeLoveComment[]> {
    return this.likeLoveCommentService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<LikeLoveComment> {
    return this.likeLoveCommentService.getById(+id);
  }

  @Post()
  async create(
    @Body() likeLoveComment: LikeLoveComment,
  ): Promise<LikeLoveComment> {
    return this.likeLoveCommentService.create(likeLoveComment);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.likeLoveCommentService.delete(+id);
  }
}
