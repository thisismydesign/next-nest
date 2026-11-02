import { Test, TestingModule } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { testDatabase } from '../../../test/database.js';
import { ThingsModule } from '../app/things/things.module.js';
import { ThingsService } from '../app/things/things.service.js';
import { SeedCommand, seedThings } from './seed.command.js';

describe('SeedCommand', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [testDatabase, ThingsModule],
      providers: [SeedCommand],
    }).compile();
  });

  afterEach(() => module.close());

  it('creates the things once', async () => {
    await module.get(SeedCommand).run();
    await module.get(SeedCommand).run();

    const things = await module.get(ThingsService).findAll();
    expect(things.map(({ name }) => ({ name }))).toEqual(seedThings);
  });
});
