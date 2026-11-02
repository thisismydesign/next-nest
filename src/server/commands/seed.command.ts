import { Command, CommandRunner } from 'nest-commander';

import { ThingsService } from '../app/things/things.service.js';

export const seedThings = [{ name: 'this is a thing you can order' }];

@Command({ name: 'seed', description: 'Create the things that are missing' })
export class SeedCommand extends CommandRunner {
  constructor(private things: ThingsService) {
    super();
  }

  async run() {
    for (const thing of seedThings) {
      if (!(await this.things.findOne({ where: thing }))) {
        await this.things.create({ ...thing });
      }
    }
  }
}
