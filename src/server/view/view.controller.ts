import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';

import { JwtAuthGuard } from '../app/auth/jwt-auth.guard.js';
import { ViewService } from './view.service.js';

const privatePages = ['profile', 'orders'];

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  // Client-side navigation loads pages from /_next/data; declared before _next/*splat so the guard applies there too.
  @Get([
    ...privatePages,
    ...privatePages.map((page) => `_next/data/:build/${page}.json`),
  ])
  @UseGuards(JwtAuthGuard)
  privatePage(@Req() req: Request, @Res() res: Response) {
    return this.viewService.handler(req, res);
  }

  @Get(['', '_next/*splat', '__nextjs*splat', 'things'])
  page(@Req() req: Request, @Res() res: Response) {
    return this.viewService.handler(req, res);
  }
}
