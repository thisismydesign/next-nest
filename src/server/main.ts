import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { ServerModule } from './server.module.js';

const app = await NestFactory.create(ServerModule);
// Next.js and the analytics snippet rely on inline scripts; a content security policy needs nonces first.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
await app.listen(process.env.PORT ?? 3000);
