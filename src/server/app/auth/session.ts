import type { ConfigService } from '@nestjs/config';
import type { CookieOptions } from 'express';

export const SESSION_COOKIE = 'session';

export type SessionUser = { id: number; username: string };

export const cookieOptions = (config: ConfigService): CookieOptions => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: config.get('NODE_ENV') === 'production',
});
