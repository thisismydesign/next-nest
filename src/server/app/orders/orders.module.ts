import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThingsModule } from '../things/things.module.js';
import { Order } from './order.entity.js';
import { OrdersResolver } from './orders.resolver.js';
import { OrdersService } from './orders.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ThingsModule],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
