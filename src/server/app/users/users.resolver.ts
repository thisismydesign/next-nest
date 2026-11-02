import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import type { SessionUser } from '../auth/session.js';

import { User } from './user.entity.js';
import { UsersService } from './users.service.js';

@Resolver(() => User)
export class UsersResolver {
  constructor(private service: UsersService) {}

  @Query(() => [User])
  users() {
    return this.service.findAll();
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: SessionUser) {
    return this.service.findOne({ where: { id: user.id } });
  }
}
