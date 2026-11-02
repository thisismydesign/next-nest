import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobsModule } from '../jobs/jobs.module.js';
import { ThingsModule } from '../things/things.module.js';
import { Order } from './order.entity.js';
import { OrdersJobs } from './orders.jobs.js';
import { OrdersResolver } from './orders.resolver.js';
import { OrdersService } from './orders.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ThingsModule, JobsModule],
  providers: [OrdersService, OrdersResolver, OrdersJobs],
})
export class OrdersModule {}
