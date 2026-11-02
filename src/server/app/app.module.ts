import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
