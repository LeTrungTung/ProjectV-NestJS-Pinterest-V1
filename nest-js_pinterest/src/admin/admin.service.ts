import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly connection: Connection,
  ) {}

  async validateAdmin(email: string, password: string) {
    const query = 'SELECT * FROM users WHERE email = ? AND role = 1';
    const [admin] = await this.connection.query(query, [email]);

    if (admin) {
      const isPasswordMatch = await bcrypt.compare(password, admin.password);

      if (isPasswordMatch) {
        return admin;
      }
    }
    return null;
  }

  async generateAccessToken(admin: any) {
    const payload = { adminId: admin.id };
    return this.jwtService.sign(payload);
  }
}
