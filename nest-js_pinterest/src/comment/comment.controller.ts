import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../database/comment.entity';

@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get('/get-love-comment')
  async getLoveComments() {
    return this.commentService.getLoveComments();
  }

  @Get('/get-like-comment')
  async getLikeComments() {
    return this.commentService.getLikeComments();
  }

  @Get('/get-all-comment')
  async getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment | undefined> {
    return this.commentService.findById(+id);
  }

  @Post()
  async create(@Body() comment: Comment): Promise<Comment> {
    return this.commentService.create(comment);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() comment: Comment,
  ): Promise<Comment | undefined> {
    return this.commentService.update(+id, comment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(+id);
  }
}
