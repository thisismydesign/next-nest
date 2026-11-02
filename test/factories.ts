import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';

import { CreateOrder } from '../src/server/app/orders/orders.service.js';
import { CreateThing } from '../src/server/app/things/things.service.js';
import { CreateUser } from '../src/server/app/users/users.service.js';

export const usersFactory = Factory.define<CreateUser>(() => ({
  provider: faker.helpers.arrayElement(['google', 'cognito']),
  providerId: faker.string.hexadecimal({ length: 10 }),
  username: faker.internet.email(),
  name: faker.person.fullName(),
}));

export const thingsFactory = Factory.define<CreateThing>(() => ({
  name: faker.lorem.words(),
}));

export const ordersFactory = Factory.define<CreateOrder>(
  ({ associations }) => ({
    alias: faker.internet.username(),
    user: associations.user!,
    thing: associations.thing!,
  }),
);
