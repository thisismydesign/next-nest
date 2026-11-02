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

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alias: string;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @ManyToOne(() => Thing, (thing) => thing.orders, { nullable: false })
  thing: Thing;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
