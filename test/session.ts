import { INestApplication } from '@nestjs/common';

import { SESSION_COOKIE, SessionUser } from '../src/server/app/auth/session.js';
import { SessionService } from '../src/server/app/auth/session.service.js';

export const sessionCookie = (app: INestApplication, user: SessionUser) =>
  `${SESSION_COOKIE}=${app.get(SessionService).token(user)}`;
