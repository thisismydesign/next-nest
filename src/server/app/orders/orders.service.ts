import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Thing } from '../things/thing.entity.js';
import { User } from '../users/user.entity.js';
import { Order } from './order.entity.js';

export type CreateOrder = {
  alias: string;
  user: Pick<User, 'id'>;
  thing: Pick<Thing, 'id'>;
};

const relations = { user: true, thing: true };

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orders: Repository<Order>) {}

  create(order: CreateOrder) {
    return this.orders.save(order);
  }

  findOne(options: FindOneOptions<Order>) {
    return this.orders.findOne({ relations, ...options });
  }

  findAll(options: FindManyOptions<Order> = {}) {
    return this.orders.find({ relations, ...options });
  }

  async findOrCreate(order: CreateOrder) {
    const where = {
      alias: order.alias,
      user: { id: order.user.id },
      thing: { id: order.thing.id },
    };
    return (await this.findOne({ where })) ?? this.create(order);
  }
}
