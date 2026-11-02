import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

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
  user: Relation<User>;

  @Field(() => Thing)
  @ManyToOne(() => Thing, (thing) => thing.orders, { nullable: false })
  thing: Relation<Thing>;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
