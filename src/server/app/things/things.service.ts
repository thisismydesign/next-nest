import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

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

  findAll() {
    return this.things.find();
  }
}
