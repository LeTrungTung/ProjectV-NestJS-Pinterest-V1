// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request, Response } from 'express';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() body: any) {
    console.log(body);

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

  @Post('/refresh-token')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}
