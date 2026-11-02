import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createApp } from './app.js';
import { sessionCookie } from './session.js';

describe('REST', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(() => app.close());

  it('rejects /private without a session', () =>
    request(app.getHttpServer()).get('/private').expect(401));

  it('returns the session user on /private', async () => {
    const user = { id: 1, username: 'someone' };

    const res = await request(app.getHttpServer())
      .get('/private')
      .set('Cookie', sessionCookie(app, user))
      .expect(200);

    expect(res.body).toEqual(user);
  });
});
