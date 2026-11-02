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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  provider: Provider;

  @Column()
  providerId: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
