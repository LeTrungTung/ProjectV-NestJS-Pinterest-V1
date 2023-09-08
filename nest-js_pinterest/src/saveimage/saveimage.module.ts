import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageSavedUser } from '../database/saveimage.entity';
import { ImageSavedUserController } from './saveimage.controller';
import { ImageSavedUserService } from './saveimage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageSavedUser])],
  controllers: [ImageSavedUserController],
  providers: [ImageSavedUserService],
})
export class ImageSavedUserModule {}
