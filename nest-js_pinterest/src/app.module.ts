import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import { ImageSavedUserModule } from './saveimage/saveimage.module';
import { OperationImageModule } from './operationimage/operationimage.module';
import { LikeLoveCommentModule } from './likelovecomment/likelovecomment.module';
import { FollowModule } from './follow/follow.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ImageModule,
    CommentModule,
    ImageSavedUserModule,
    OperationImageModule,
    LikeLoveCommentModule,
    FollowModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
