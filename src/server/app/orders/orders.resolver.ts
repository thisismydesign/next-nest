import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import type { SessionUser } from '../auth/session.js';
import { ThingsService } from '../things/things.service.js';
import { Order } from './order.entity.js';
import { OrdersService } from './orders.service.js';

@Resolver(() => Order)
@UseGuards(JwtAuthGuard)
export class OrdersResolver {
  constructor(
    private service: OrdersService,
    private things: ThingsService,
  ) {}

  @Query(() => [Order])
  orders(@CurrentUser() user: SessionUser) {
    return this.service.findAll({ where: { user: { id: user.id } } });
  }

  @Mutation(() => Order)
  async createOrder(
    @CurrentUser() user: SessionUser,
    @Args('thingName') thingName: string,
    @Args('alias') alias: string,
  ) {
    const thing = await this.things.findOne({ where: { name: thingName } });
    if (!thing) throw new NotFoundException(`No thing named ${thingName}`);
    return this.service.findOrCreate({ alias, user, thing });
  }
}
