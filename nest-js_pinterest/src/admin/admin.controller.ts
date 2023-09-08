import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async loginAdmin(@Body() req: any) {
    try {
      const { email, password } = req;
      const admin = await this.adminService.validateAdmin(email, password);

      if (!admin) {
        return { message: 'Invalid email or password' };
      }

      const accessToken = await this.adminService.generateAccessToken(admin);
      return { message: 'Admin login successful', accessToken, data: admin };
    } catch (error) {
      return { message: 'Internal Server Error' };
    }
  }
}
