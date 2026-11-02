import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service.js';
import { CurrentUser, JwtAuthGuard } from './auth/jwt-auth.guard.js';
import type { SessionUser } from './auth/session.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('private')
  @UseGuards(JwtAuthGuard)
  getPrivate(@CurrentUser() user: SessionUser) {
    return user;
  }
}
