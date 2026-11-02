import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get(['_next/*splat', '__nextjs*splat', 'home'])
  page(@Req() req: Request, @Res() res: Response) {
    return this.viewService.handler(req, res);
  }
}
