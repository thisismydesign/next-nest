import { Module } from '@nestjs/common';

import { ViewController } from './view.controller.js';
import { ViewService } from './view.service.js';

@Module({
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
