import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
