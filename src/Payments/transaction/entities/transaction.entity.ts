import { TransactionEnum } from 'src/common/enum/transaction.enum';
import { Order } from 'src/Orders/order/entities/order.entity';
import { Payment } from 'src/Payments/payment/entities/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  order_id!: string;

  @Column({ type: 'uuid' })
  payment_id!: string;

  @Column({ type: 'varchar', length: 100 })
  transaction_ref!: string;

  @Column({ type: 'varchar', length: 100 })
  transaction_name!: string;

  @Column({ type: 'enum', enum: TransactionEnum })
  transaction_type!: TransactionEnum;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @ManyToOne(() => Payment, (payment) => payment.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id' })
  payment!: Payment;

  @ManyToOne(() => Order, (order) => order.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order!: Order;
}
