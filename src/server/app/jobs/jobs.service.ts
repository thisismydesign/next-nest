import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PgBoss } from 'pg-boss';

@Injectable()
export class JobsService implements OnModuleInit, OnApplicationShutdown {
  private boss: PgBoss;
  private logger = new Logger(JobsService.name);
  private queues = new Set<string>();

  constructor(config: ConfigService) {
    this.boss = new PgBoss(config.getOrThrow<string>('DATABASE_URL'));
    // An unhandled 'error' event would crash the process.
    this.boss.on('error', (error) => this.logger.error(error));
  }

  async onModuleInit() {
    await this.boss.start();
  }

  onApplicationShutdown() {
    return this.boss.stop();
  }

  async send<T extends object>(queue: string, data: T) {
    await this.queue(queue);
    return this.boss.send(queue, data);
  }

  async work<T extends object>(
    queue: string,
    handler: (data: T) => Promise<unknown>,
  ) {
    await this.queue(queue);
    await this.boss.work<T>(queue, (jobs) =>
      Promise.all(jobs.map((job) => handler(job.data))),
    );
  }

  private async queue(name: string) {
    if (this.queues.has(name)) return;
    await this.boss.createQueue(name);
    this.queues.add(name);
  }
}
