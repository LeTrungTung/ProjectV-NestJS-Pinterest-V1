import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/user.entity';
import { multerUpload } from 'src/utils/multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findById(+id);
  }
  @Get('email/:email')
  async findEmail(@Param('email') email: string): Promise<User | undefined> {
    return this.userService.findByEmail(email);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User | undefined> {
    return this.userService.update(+id, user);
  }

  @Patch('/edit-status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User | undefined> {
    return this.userService.update(+id, user);
  }

  @Patch('/avatar/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], multerUpload),
  )
  updateAvatar(
    @UploadedFiles() files: any,
    @Body() data: User,
    @Param('id') id: number,
  ) {
    if (files.avatar) {
      data.avatar = files.avatar[0].path;
    }
    console.log('xem file', files);
    return this.userService.updateAvatar(data, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.delete(+id);
  }
}
