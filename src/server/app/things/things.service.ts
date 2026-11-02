import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Thing } from './thing.entity.js';

export type CreateThing = { name: string };

@Injectable()
export class ThingsService {
  constructor(@InjectRepository(Thing) private things: Repository<Thing>) {}

  create(thing: CreateThing) {
    return this.things.save(thing);
  }

  findOne(options: FindOneOptions<Thing>) {
    return this.things.findOne(options);
  }

  findAll(options: FindManyOptions<Thing> = {}) {
    return this.things.find(options);
  }
}
