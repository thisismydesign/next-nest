import { Test, TestingModule } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  ordersFactory,
  thingsFactory,
  usersFactory,
} from '../../../../test/factories.js';
import { testDatabase } from '../../../../test/database.js';
import { ThingsService } from '../things/things.service.js';
import { UsersModule } from '../users/users.module.js';
import { UsersService } from '../users/users.service.js';
import { OrdersModule } from './orders.module.js';
import { OrdersService } from './orders.service.js';

describe('OrdersService', () => {
  let module: TestingModule;
  let orders: OrdersService;
  let users: UsersService;
  let things: ThingsService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [testDatabase, OrdersModule, UsersModule],
    }).compile();
    orders = module.get(OrdersService);
    users = module.get(UsersService);
    things = module.get(ThingsService);
  });

  afterEach(() => module.close());

  describe('findOrCreate', () => {
    it('creates an order once', async () => {
      const user = await users.create(usersFactory.build());
      const thing = await things.create(thingsFactory.build());
      const order = ordersFactory.build({}, { associations: { user, thing } });

      const first = await orders.findOrCreate(order);
      const second = await orders.findOrCreate(order);

      expect(second.id).toEqual(first.id);
      expect(
        await orders.findAll({ where: { user: { id: user.id } } }),
      ).toHaveLength(1);
    });
  });
});
