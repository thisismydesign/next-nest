import { Query, Resolver } from '@nestjs/graphql';

import { User } from './user.entity.js';
import { UsersService } from './users.service.js';

@Resolver(() => User)
export class UsersResolver {
  constructor(private service: UsersService) {}

  @Query(() => [User])
  users() {
    return this.service.findAll();
  }
}
