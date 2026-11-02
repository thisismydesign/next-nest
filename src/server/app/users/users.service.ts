import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return this.users.findOneBy({ id });
  }

  async findOrCreate(user: CreateUser) {
    const { provider, providerId } = user;
    return (
      (await this.users.findOneBy({ provider, providerId })) ??
      this.create(user)
    );
  }
}
