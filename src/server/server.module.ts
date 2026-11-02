import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AppModule, ViewModule],
})
export class ServerModule {}
