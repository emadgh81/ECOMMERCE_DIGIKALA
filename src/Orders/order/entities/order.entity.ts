import { OrderEnum } from 'src/common/enum/order.enum';
import { OrderItem } from 'src/Orders/order_item/entities/order_item.entity';
import { Payment } from 'src/Payments/payment/entities/payment.entity';
import { Transaction } from 'src/Payments/transaction/entities/transaction.entity';
import { User } from 'src/Users/user/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  user_id!: string;

  @Column({ type: 'enum', enum: OrderEnum })
  status!: OrderEnum;

  @Column({ type: 'int' })
  total_price!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments?: Payment[];

  @OneToMany(() => Transaction, (transaction) => transaction.order)
  transactions?: Transaction[];

  @OneToMany(() => OrderItem, (items) => items.order)
  items?: OrderItem[];
}
