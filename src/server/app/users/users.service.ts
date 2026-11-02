import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Provider, User } from './user.entity.js';

export type CreateUser = {
  provider: Provider;
  providerId: string;
  username: string;
  name?: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  create(user: CreateUser) {
    return this.users.save(user);
  }

  findOne(options: FindOneOptions<User>) {
    return this.users.findOne(options);
  }

  findAll(options: FindManyOptions<User> = {}) {
    return this.users.find(options);
  }
}
