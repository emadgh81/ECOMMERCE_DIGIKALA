import { OrderEnum } from 'src/common/enum/order.enum';
import { Order } from 'src/Orders/order/entities/order.entity';

export const ORDER_REPOSITORY = 'IOrderRepository';
export interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByUser(userId: string): Promise<Order[]>;
  findByStatus(status: OrderEnum): Promise<Order[]>;
  createAndSave(order: Partial<Order>): Promise<Order>;
  save(order: Order): Promise<Order>;
  remove(order: Order): Promise<void>;
}
