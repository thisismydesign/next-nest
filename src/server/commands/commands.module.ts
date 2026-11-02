import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from '../app/app.module.js';
import { ThingsModule } from '../app/things/things.module.js';
import { SeedCommand } from './seed.command.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AppModule, ThingsModule],
  providers: [SeedCommand],
})
export class CommandsModule {}
