import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OperationImageService } from './operationimage.service';
import { OperationImage } from 'src/database/operationimage.entity';

@Controller('api/v1/operation-image')
export class OperationImageController {
  constructor(private readonly operationImageService: OperationImageService) {}

  @Get()
  async getAll(): Promise<OperationImage[]> {
    return this.operationImageService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<OperationImage> {
    return this.operationImageService.getById(+id);
  }

  @Post()
  async create(
    @Body() operationImage: OperationImage,
  ): Promise<OperationImage> {
    return this.operationImageService.create(operationImage);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() operationImage: OperationImage,
  ): Promise<OperationImage> {
    return this.operationImageService.update(+id, operationImage);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.operationImageService.delete(+id);
  }
}
