import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { User } from './user.entity.js';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
