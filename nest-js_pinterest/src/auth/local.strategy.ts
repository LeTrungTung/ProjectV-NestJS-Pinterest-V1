import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('Email:', email);
    console.log('Password:', password);
    const user = await this.authService.validateUser(email, password);
    console.log(444, user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
