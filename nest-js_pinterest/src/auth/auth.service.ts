// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('Validating user for email:', email);
    const user = await this.userService.findByEmail(email);
    console.log('User:', user);
    // console.log('Password comparison result:', result);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signUp(body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new User();
    newUser.username = body.username;
    newUser.email = body.email;
    newUser.password = hashedPassword;

    const savedUser = await this.userService.create(newUser);
    return savedUser;
  }

  async logIn(body: any) {
    // const payload = { username: body.username, sub: body.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    const user = await this.userService.findByEmail(body.email);
    console.log(222, user);
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const payload = { username: user.username, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      return { success: true, access_token, user };
    }
    return { success: false };
  }
}
