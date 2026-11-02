import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Thing } from './thing.entity.js';
import { ThingsResolver } from './things.resolver.js';
import { ThingsService } from './things.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Thing])],
  providers: [ThingsService, ThingsResolver],
  exports: [ThingsService],
})
export class ThingsModule {}
