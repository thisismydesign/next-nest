import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUser, JwtAuthGuard } from './auth/jwt-auth.guard.js';
import type { User } from './users/user.entity.js';

@Controller('api')
export class AppController {
  @Get()
  hello() {
    return { hello: 'from NestJS', at: new Date().toISOString() };
  }

  @Get('private')
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
