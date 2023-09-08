import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageSavedUser } from '../database/saveimage.entity';

@Injectable()
export class ImageSavedUserService {
  constructor(
    @InjectRepository(ImageSavedUser)
    private imageSavedUserRepository: Repository<ImageSavedUser>,
  ) {}

  async findAll(): Promise<ImageSavedUser[]> {
    return this.imageSavedUserRepository.find();
  }

  async findById(id: number): Promise<ImageSavedUser | undefined> {
    return this.imageSavedUserRepository.findOneBy({ idSaveImage: id });
  }

  async create(image: ImageSavedUser): Promise<ImageSavedUser> {
    return this.imageSavedUserRepository.save(image);
  }

  async update(
    id: number,
    image: ImageSavedUser,
  ): Promise<ImageSavedUser | undefined> {
    await this.imageSavedUserRepository.update(id, image);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.imageSavedUserRepository.delete(id);
  }
}
