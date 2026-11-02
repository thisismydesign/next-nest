import { NestFactory } from '@nestjs/core';

import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
