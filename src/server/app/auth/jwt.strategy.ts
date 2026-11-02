import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service.js';
import { SESSION_COOKIE } from './session.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private users: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies?.[SESSION_COOKIE] ?? null,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: { sub: number }) {
    return this.users.findOne(payload.sub);
  }
}
