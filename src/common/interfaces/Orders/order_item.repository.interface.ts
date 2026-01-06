import { OrderItem } from 'src/Orders/order_item/entities/order_item.entity';

export const ORDER_ITEM_REPOSITORY = 'IOrderItemRepository';
export interface OrderItemRepository {
  findById(id: string): Promise<OrderItem | null>;
  findByOrder(orderId: string): Promise<OrderItem[]>;
  findByOrderAndVariant(
    orderId: string,
    productVariantId: string,
  ): Promise<OrderItem[]>;
  createAndSave(orderItem: Partial<OrderItem>): Promise<OrderItem>;
  save(orderItem: OrderItem): Promise<OrderItem>;
  remove(orderItem: OrderItem): Promise<void>;
}
