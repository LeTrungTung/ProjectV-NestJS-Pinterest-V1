import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  Inject,
  Module,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from '../database/image.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerUpload } from 'src/utils/multer';

@Controller('api/v1/image')
// @Module({
//   imports: [ImageModule], // Đảm bảo ImageModule được import ở đây
// })
export class ImageController {
  constructor(
    private imageService: ImageService, // @Inject(ImageService) private readonly imageService: ImageService,
  ) {}

  @Get()
  async findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Get('/get-image-comment')
  async findAllImgCommentUser(): Promise<Comment[]> {
    return this.imageService.getImageComment();
  }

  @Get('/get-image-love')
  async findAllImgLove(): Promise<Comment[]> {
    return this.imageService.getLoveImages();
  }

  @Get('/get-image-like')
  async findAllImgLike(): Promise<Comment[]> {
    return this.imageService.getLikeImages();
  }

  @Get('/get-image-user/:id')
  async getImageCreatedByUserId(@Param('id') userId: number) {
    return this.imageService.getImagesCreatedByUserId(userId);
  }

  @Get('get-user-create-image/:id')
  async getUserCreatedByImageId(@Param('id') imageId: number) {
    return this.imageService.getUserCreatedByImageId(imageId);
  }

  @Get('get-image-user-save/:id')
  async getImagesSavedByUserId(@Param('id') userId: number) {
    return this.imageService.getImagesSavedByUserId(userId);
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Image | undefined> {
    return this.imageService.findById(+id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'linkImage', maxCount: 1 }], multerUpload),
  )
  async addImage(@UploadedFiles() files: any, @Body() data: Image) {
    if (files.linkImage) {
      data.linkImage = files.linkImage[0].path;
    }
    console.log('xem file', files);
    return this.imageService.create(data);
  }

  // async create(@Body() image: Image): Promise<Image> {
  //   return this.imageService.create(image);
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() image: Image,
  ): Promise<Image | undefined> {
    return this.imageService.update(+id, image);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.imageService.delete(+id);
  }
}
