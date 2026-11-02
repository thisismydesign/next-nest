import { Module } from '@nestjs/common';

import { AppModule } from './app/app.module.js';
import { ViewModule } from './view/view.module.js';

@Module({
  imports: [AppModule, ViewModule],
})
export class ServerModule {}
