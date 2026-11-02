import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from '../orders/order.entity.js';

export type Provider = 'google' | 'cognito';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  provider: Provider;

  @Field()
  @Column()
  providerId: string;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
