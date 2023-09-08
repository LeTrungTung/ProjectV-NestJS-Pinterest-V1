// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
// import { Request } from 'express';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() body: any) {
    return this.authService.signUp(body);
  }

  // @UseGuards(AuthGuard)
  @Post('login')
  async logIn(@Body() body: any) {
    // return this.authService.logIn(body);
    const result = await this.authService.logIn(body);
    if (result.success) {
      return {
        message: 'Login successful',
        access_token: result.access_token,
        userLogin: result.user,
      };
    } else {
      return { message: 'Login failed' };
    }
  }
}
