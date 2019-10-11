import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';

// 这个文件是一个验证策略
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ssshhhh',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload:', payload );
  }
}
