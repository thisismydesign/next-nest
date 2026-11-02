import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { ViewService } from './view.service.js';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get(['_next/*splat', '__nextjs*splat', 'home'])
  page(@Req() req: Request, @Res() res: Response) {
    return this.viewService.handler(req, res);
  }
}
