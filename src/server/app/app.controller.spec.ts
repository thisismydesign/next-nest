import { describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  it('greets', async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    expect(module.get(AppController).getHello()).toBe('Hello from NestJS!');
  });
});
