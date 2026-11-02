import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { UsersService } from '../src/server/app/users/users.service.js';
import { createApp } from './app.js';
import { usersFactory } from './factories.js';
import { sessionCookie } from './session.js';

describe('REST', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(() => app.close());

  it('rejects /private without a session', () =>
    request(app.getHttpServer()).get('/api/private').expect(401));

  it('rejects a session whose user is gone', () =>
    request(app.getHttpServer())
      .get('/api/private')
      .set('Cookie', sessionCookie(app, { id: 0, username: 'gone' }))
      .expect(401));

  it('returns the session user on /private', async () => {
    const user = await app.get(UsersService).create(usersFactory.build());

    const res = await request(app.getHttpServer())
      .get('/api/private')
      .set('Cookie', sessionCookie(app, user))
      .expect(200);

    expect(res.body).toMatchObject({ id: user.id, username: user.username });
  });
});
