import type { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { describe, expect, it, vi } from 'vitest';

import { oauthState } from './oauth-state.js';

// passport-oauth2 types only the session store's arities; it calls `store` with the verifier when there are 5 parameters.
const store = oauthState({
  get: () => 'test',
} as unknown as ConfigService) as unknown as Record<
  'store' | 'verify',
  (...args: unknown[]) => void
>;

const roundTrip = (verifier: string | undefined, returnedState?: string) => {
  const res = { cookie: vi.fn(), clearCookie: vi.fn() };
  const req = { res, cookies: {} } as unknown as Request;
  let state = '';
  store.store(req, verifier, undefined, {}, (_err: unknown, s: string) => {
    state = s;
  });
  req.cookies.oauth_state = res.cookie.mock.calls[0][1];

  let ok: unknown;
  store.verify(req, returnedState ?? state, (_err: unknown, o: unknown) => {
    ok = o;
  });
  expect(res.clearCookie).toHaveBeenCalled();
  return ok;
};

describe('oauthState', () => {
  it('accepts the state it issued', () => {
    expect(roundTrip(undefined)).toBe(true);
  });

  it('hands back the PKCE verifier', () => {
    expect(roundTrip('verifier')).toBe('verifier');
  });

  it('rejects any other state', () => {
    expect(roundTrip('verifier', 'forged')).toBe(false);
  });
});
