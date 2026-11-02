import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { ThingsService } from '../src/server/app/things/things.service.js';
import { createApp } from './app.js';
import { thingsFactory } from './factories.js';

describe('GraphQL', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(() => app.close());

  it('lists things', async () => {
    const thing = await app.get(ThingsService).create(thingsFactory.build());

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ things { id name } }' })
      .expect(200);

    expect(res.body.data.things).toEqual([{ id: thing.id, name: thing.name }]);
  });
});
