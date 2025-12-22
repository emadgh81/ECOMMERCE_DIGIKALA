import { PaymentEnum } from 'src/common/enum/payment.enum';
import { Order } from 'src/Orders/order/entities/order.entity';
import { PaymentGateway } from 'src/Payments/payment_gateway/entities/payment_gateway.entity';
import { Transaction } from 'src/Payments/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  order_id!: string;

  @Column({ type: 'uuid' })
  payment_gateway_id!: string;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'enum', enum: PaymentEnum })
  status!: PaymentEnum;

  @Column({ type: 'jsonb', nullable: true })
  request_payload?: string;

  @Column({ type: 'jsonb', nullable: true })
  reasponse_payload?: string;

  @Column({ type: 'jsonb', nullable: true })
  verify_request?: string;

  @Column({ type: 'jsonb', nullable: true })
  verify_reasponse?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToOne(() => PaymentGateway, (gateway) => gateway.payments)
  @JoinColumn({ name: 'payment_gateway_id' })
  payment_gateway!: PaymentGateway;

  @OneToMany(() => Transaction, (transaction) => transaction.payment)
  transactions!: Transaction[];
}
