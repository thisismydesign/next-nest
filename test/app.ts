import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { AppModule } from '../src/server/app/app.module.js';

// The API as in production, on an emptied test database.
export const createApp = async (): Promise<INestApplication> => {
  const module = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
      AppModule,
    ],
  }).compile();
  const app = module.createNestApplication();
  app.use(cookieParser());
  await app.init();
  await app.get(DataSource).synchronize(true);
  return app;
};
