import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Thing } from './thing.entity.js';
import { ThingsService } from './things.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Thing])],
  providers: [ThingsService],
  exports: [ThingsService],
})
export class ThingsModule {}
