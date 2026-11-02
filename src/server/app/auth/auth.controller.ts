import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import { SessionService } from './session.service.js';

@Controller('auth')
export class AuthController {
  constructor(private session: SessionService) {}

  @Get(['google', 'google/redirect'])
  @UseGuards(AuthGuard('google'))
  google(@Req() req: Request, @Res() res: Response) {
    this.signIn(req, res);
  }

  @Get(['cognito', 'cognito/redirect'])
  @UseGuards(AuthGuard('cognito'))
  cognito(@Req() req: Request, @Res() res: Response) {
    this.signIn(req, res);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    this.session.end(res);
    res.redirect(303, '/');
  }

  private signIn(req: Request, res: Response) {
    this.session.start(res, req.user!);
    res.redirect('/profile');
  }
}
