import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ImageSavedUserService } from './saveimage.service';
import { ImageSavedUser } from 'src/database/saveimage.entity';

@Controller('api/v1/images-saved-user')
export class ImageSavedUserController {
  constructor(
    private imageSaveUserService: ImageSavedUserService, // @Inject(imageSaveUserService) private readonly imageSaveUserService: imageSaveUserService,
  ) {}

  @Get()
  async findAll(): Promise<ImageSavedUser[]> {
    return this.imageSaveUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ImageSavedUser | undefined> {
    return this.imageSaveUserService.findById(+id);
  }

  @Post()
  async create(@Body() image: ImageSavedUser): Promise<ImageSavedUser> {
    return this.imageSaveUserService.create(image);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() image: ImageSavedUser,
  ): Promise<ImageSavedUser | undefined> {
    return this.imageSaveUserService.update(+id, image);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.imageSaveUserService.delete(+id);
  }
}
