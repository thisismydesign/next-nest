import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Thing } from '../things/thing.entity.js';
import { User } from '../users/user.entity.js';

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  alias: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @Field(() => Thing)
  @ManyToOne(() => Thing, (thing) => thing.orders, { nullable: false })
  thing: Thing;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
