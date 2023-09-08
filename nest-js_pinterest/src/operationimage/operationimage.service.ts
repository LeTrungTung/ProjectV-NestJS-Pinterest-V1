import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationImage } from 'src/database/operationimage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperationImageService {
  constructor(
    @InjectRepository(OperationImage)
    private operationImageRepository: Repository<OperationImage>,
  ) {}

  async getAll(): Promise<OperationImage[]> {
    return this.operationImageRepository.find();
  }

  async getById(id: number): Promise<OperationImage> {
    return this.operationImageRepository.findOneBy({ idOperationImage: id });
  }

  async create(operationImage: OperationImage): Promise<OperationImage> {
    return this.operationImageRepository.save(operationImage);
  }

  async update(
    id: number,
    operationImage: OperationImage,
  ): Promise<OperationImage> {
    await this.operationImageRepository.update(id, operationImage);
    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    await this.operationImageRepository.delete(id);
  }
}
