import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { DataSource } from 'typeorm';

import { OrdersService } from '../src/server/app/orders/orders.service.js';
import { ThingsService } from '../src/server/app/things/things.service.js';
import { UsersService } from '../src/server/app/users/users.service.js';
import { createApp } from './app.js';
import { ordersFactory, thingsFactory, usersFactory } from './factories.js';
import { sessionCookie } from './session.js';

describe('GraphQL', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  beforeEach(() => app.get(DataSource).synchronize(true));

  afterAll(() => app.close());

  const query = (query: string) =>
    request(app.getHttpServer()).post('/graphql').send({ query });

  it('lists things', async () => {
    const thing = await app.get(ThingsService).create(thingsFactory.build());

    const res = await query('{ things { id name } }').expect(200);

    expect(res.body.data.things).toEqual([{ id: thing.id, name: thing.name }]);
  });

  describe('orders', () => {
    it('needs a session', async () => {
      const res = await query('{ orders { id } }').expect(200);

      expect(res.body.errors[0].message).toEqual('Unauthorized');
    });

    it('lists the session user’s orders', async () => {
      const user = await app.get(UsersService).create(usersFactory.build());
      const thing = await app.get(ThingsService).create(thingsFactory.build());
      const order = await app
        .get(OrdersService)
        .create(ordersFactory.build({}, { associations: { user, thing } }));

      const res = await query('{ orders { id alias thing { name } } }')
        .set('Cookie', sessionCookie(app, user))
        .expect(200);

      expect(res.body.data.orders).toEqual([
        { id: order.id, alias: order.alias, thing: { name: thing.name } },
      ]);
    });
  });
});
