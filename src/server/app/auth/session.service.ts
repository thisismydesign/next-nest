import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import { SESSION_COOKIE, SessionUser } from './session.js';

@Injectable()
export class SessionService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  token(user: SessionUser) {
    return this.jwt.sign({ sub: user.id, username: user.username });
  }

  start(res: Response, user: SessionUser) {
    res.cookie(SESSION_COOKIE, this.token(user), {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.get('NODE_ENV') === 'production',
    });
  }
}
