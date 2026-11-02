import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

import { GRAPHQL_PATH, PageGuard } from './page.guard.js';
import { ViewService } from './view.service.js';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get(['', '*splat'])
  @UseGuards(PageGuard)
  page(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    if (req.path === GRAPHQL_PATH) return next();
    return this.viewService.handler(req, res);
  }
}
