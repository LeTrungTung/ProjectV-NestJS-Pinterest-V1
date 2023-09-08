import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationImageController } from './operationimage.controller';
import { OperationImageService } from './operationimage.service';
import { OperationImage } from 'src/database/operationimage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationImage])],
  controllers: [OperationImageController],
  providers: [OperationImageService],
})
export class OperationImageModule {}
