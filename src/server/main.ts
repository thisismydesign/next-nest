import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { ServerModule } from './server.module.js';

const app = await NestFactory.create(ServerModule);
app.use(cookieParser());
await app.listen(process.env.PORT ?? 3000);
