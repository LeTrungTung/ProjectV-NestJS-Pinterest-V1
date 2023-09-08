import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '../database/follow.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { User } from 'src/database/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
