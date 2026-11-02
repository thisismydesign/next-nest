import { Module } from '@nestjs/common';

import { AppModule } from '../app/app.module.js';
import { ThingsModule } from '../app/things/things.module.js';
import { SeedCommand } from './seed.command.js';

@Module({
  imports: [AppModule, ThingsModule],
  providers: [SeedCommand],
})
export class CommandsModule {}
