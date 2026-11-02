import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import * as nextModule from 'next';

// Node maps `default` of an __esModule CommonJS package to module.exports.default; TypeScript still types it as module.exports.
const next = nextModule.default as unknown as typeof nextModule.default.default;

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
