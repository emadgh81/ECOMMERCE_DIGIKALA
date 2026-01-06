import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemRepository } from 'src/common/interfaces/Orders/order_item.repository.interface';
import { OrderItem } from '../entities/order_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemPostgresRepository implements OrderItemRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  findById(id: string) {
    return this.orderItemRepo.findOne({ where: { id } });
  }

  findByOrder(orderId: string) {
    return this.orderItemRepo.find({ where: { order_id: orderId } });
  }

  findByOrderAndVariant(orderId: string, productVariantId: string) {
    return this.orderItemRepo.find({
      where: {
        order_id: orderId,
        product_variant_id: productVariantId,
      },
    });
  }

  createAndSave(orderItem: Partial<OrderItem>) {
    const ent = this.orderItemRepo.create(orderItem);
    return this.orderItemRepo.save(ent);
  }

  save(orderItem: OrderItem) {
    return this.orderItemRepo.save(orderItem);
  }

  async remove(orderItem: OrderItem) {
    await this.orderItemRepo.remove(orderItem);
  }
}
