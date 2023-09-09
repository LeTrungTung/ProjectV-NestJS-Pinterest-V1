// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/database/user.entity';
import { Request, Response } from 'express';
require('dotenv').config();

let refreshTokenArr: string[] = [];
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

  async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) return res.status(401).json('Unauthenticated-1');
      if (!refreshTokenArr.includes(refreshToken)) {
        return res.status(401).json('Unauthenticated-2');
      }
      jwt.verify(
        refreshToken,
        process.env.secretKeyRefresh,
        (err: any, user: any) => {
          if (err) {
            return res.status(400).json('refreshToken is not valid');
          }
          const { iat, exp, ...userOther } = user;
          refreshTokenArr = refreshTokenArr.filter(
            (token: string) => token !== refreshToken,
          );
          const newAccessToken = jwt.sign(userOther, process.env.secretKey, {
            expiresIn: '360s',
          });
          const newRefreshToken = jwt.sign(
            userOther,
            process.env.secretKeyRefresh,
            {
              expiresIn: '365d',
            },
          );
          refreshTokenArr.push(newRefreshToken);

          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          });
          return res.status(200).json(newAccessToken);
        },
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    refreshTokenArr = refreshTokenArr.filter(
      (token: string) => token !== req.cookies.refreshToken,
    );
    res.status(200).json('Logout Successfully');
  }
}
