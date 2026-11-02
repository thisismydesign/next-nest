import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from '../src/server/data-source.js';

export const testDatabase = TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities,
  synchronize: true,
  dropSchema: true,
  retryAttempts: 0,
});
