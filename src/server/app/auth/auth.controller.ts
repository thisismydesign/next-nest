import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import { SessionService } from './session.service.js';

@Controller('auth')
export class AuthController {
  constructor(private session: SessionService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleRedirect(@Req() req: Request, @Res() res: Response) {
    this.session.start(res, req.user!);
    res.redirect('/profile');
  }

  @Get('cognito')
  @UseGuards(AuthGuard('cognito'))
  cognito() {}

  @Get('logout')
  logout(@Res() res: Response) {
    this.session.end(res);
    res.redirect('/');
  }

  @Get('cognito/redirect')
  @UseGuards(AuthGuard('cognito'))
  cognitoRedirect(@Req() req: Request, @Res() res: Response) {
    this.session.start(res, req.user!);
    res.redirect('/profile');
  }
}
