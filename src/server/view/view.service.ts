import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import next from 'next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: ReturnType<typeof next>;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.server = next({
      dev: this.configService.get<string>('NODE_ENV') !== 'production',
      dir: './src/client',
    });
    await this.server.prepare();
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }
}
