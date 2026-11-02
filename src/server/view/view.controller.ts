import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';

import { JwtAuthGuard } from '../app/auth/jwt-auth.guard.js';
import { ViewService } from './view.service.js';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get(['_next/*splat', '__nextjs*splat', 'home', 'things'])
  page(@Req() req: Request, @Res() res: Response) {
    return this.viewService.handler(req, res);
  }

  @Get(['profile', 'orders'])
  @UseGuards(JwtAuthGuard)
  privatePage(@Req() req: Request, @Res() res: Response) {
    return this.viewService.handler(req, res);
  }
}
