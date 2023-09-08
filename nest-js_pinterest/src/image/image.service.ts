import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../database/image.entity';
import { Comment } from 'src/database/comment.entity';
import { User } from 'src/database/user.entity';
import { OperationImage } from 'src/database/operationimage.entity';
import { ImageSavedUser } from 'src/database/saveimage.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OperationImage)
    private operationImageRepository: Repository<OperationImage>,
    @InjectRepository(ImageSavedUser)
    private imageSavedUserRepository: Repository<ImageSavedUser>,
  ) {}

  async findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async findById(id: number): Promise<Image | undefined> {
    return this.imageRepository.findOneBy({ id: id });
  }

  async create(image: Image): Promise<Image> {
    return this.imageRepository.save(image);
  }

  async update(id: number, image: Image): Promise<Image | undefined> {
    await this.imageRepository.update(id, image);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }

  async getImageComment(): Promise<any[]> {
    const combinedData = await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.image', 'image')
      .innerJoinAndSelect('comment.user', 'user')
      .getMany();

    return combinedData;
  }

  async getLoveImages(): Promise<any[]> {
    return this.operationImageRepository
      .createQueryBuilder('operation_image')
      .innerJoinAndSelect('operation_image.imageOperation', 'image')
      .innerJoinAndSelect('operation_image.userLoveImage', 'user')
      .getMany();
  }

  async getLikeImages(): Promise<any[]> {
    return this.operationImageRepository
      .createQueryBuilder('operation_image')
      .innerJoinAndSelect('operation_image.imageOperation', 'image')
      .innerJoinAndSelect('operation_image.userLikeImage', 'user')
      .getMany();
  }

  async getImagesCreatedByUserId(userId: number): Promise<Image[]> {
    return this.imageRepository
      .createQueryBuilder('image')
      .innerJoinAndSelect('image.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async getUserCreatedByImageId(imageId: number): Promise<Image[]> {
    return this.imageRepository
      .createQueryBuilder('image')
      .innerJoinAndSelect('image.user', 'user')
      .where('image.id = :imageId', { imageId })
      .getMany();
  }

  async getImagesSavedByUserId(userId: number): Promise<any[]> {
    return this.imageSavedUserRepository
      .createQueryBuilder('imageSavedUser')
      .innerJoinAndSelect('imageSavedUser.imageSaved', 'image')
      .innerJoinAndSelect('imageSavedUser.userSaved', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
