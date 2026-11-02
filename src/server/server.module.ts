import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from './app/app.module.js';
import { configSchema } from './config.js';
import { ViewModule } from './view/view.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: configSchema }),
    AppModule,
    ViewModule,
  ],
})
export class ServerModule {}
