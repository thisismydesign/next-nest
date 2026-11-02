import { Query, Resolver } from '@nestjs/graphql';

import { Thing } from './thing.entity.js';
import { ThingsService } from './things.service.js';

@Resolver(() => Thing)
export class ThingsResolver {
  constructor(private service: ThingsService) {}

  @Query(() => [Thing])
  things() {
    return this.service.findAll();
  }
}
