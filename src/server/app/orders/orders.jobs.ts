import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { JobsService } from '../jobs/jobs.service.js';
import { OrdersService } from './orders.service.js';

const CONFIRM_ORDER = 'confirm-order';

@Injectable()
export class OrdersJobs implements OnApplicationBootstrap {
  constructor(
    private jobs: JobsService,
    private orders: OrdersService,
  ) {}

  onApplicationBootstrap() {
    return this.jobs.work<{ id: number }>(CONFIRM_ORDER, ({ id }) =>
      this.orders.confirm(id),
    );
  }

  confirmLater(id: number) {
    return this.jobs.send(CONFIRM_ORDER, { id });
  }
}
