import { randomBytes } from 'node:crypto';
import type { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import type { StateStore } from 'passport-oauth2';

import { cookieOptions } from './session.js';

const STATE_COOKIE = 'oauth_state';

// passport-oauth2 keeps state and the PKCE verifier in express-session by default; sessions here are stateless JWTs.
export const oauthState = (config: ConfigService) => {
  const options = () => ({ ...cookieOptions(config), path: '/auth' });

  return {
    store(
      req: Request,
      verifier: string | undefined,
      _state: unknown,
      _meta: unknown,
      callback: (err: null, state: string) => void,
    ) {
      const state = randomBytes(24).toString('base64url');
      req.res!.cookie(STATE_COOKIE, `${state}.${verifier ?? ''}`, {
        ...options(),
        maxAge: 10 * 60 * 1000,
      });
      callback(null, state);
    },
    verify(
      req: Request,
      state: string,
      callback: (err: null, ok: string | boolean, info: object) => void,
    ) {
      const [expected, verifier] = String(
        req.cookies?.[STATE_COOKIE] ?? '',
      ).split('.');
      req.res!.clearCookie(STATE_COOKIE, options());
      const ok = Boolean(expected) && expected === state;
      callback(null, ok && (verifier || true), {
        message: 'Invalid OAuth state',
      });
    },
  } as unknown as StateStore;
};
