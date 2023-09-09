import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
require('dotenv').config();

@Module({
  imports: [
    JwtModule.register({
      // secret: jwtConstants.secret,
      secret: process.env.sceretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
