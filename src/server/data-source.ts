import { DataSource } from 'typeorm';

import { Order } from './app/orders/order.entity.js';
import { Thing } from './app/things/thing.entity.js';
import { User } from './app/users/user.entity.js';

export const entities = [User, Thing, Order];

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities,
  migrations: [`${import.meta.dirname}/migration/*.js`],
});
