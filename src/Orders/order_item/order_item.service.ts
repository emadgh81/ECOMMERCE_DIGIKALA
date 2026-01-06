import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import {
  ORDER_ITEM_REPOSITORY,
  OrderItemRepository,
} from 'src/common/interfaces/Orders/order_item.repository.interface';
import { plainToInstance } from 'class-transformer';
import { OrderItem } from './entities/order_item.entity';
import {
  PRODUCT_VARIANT_REPOSITORY,
  ProductVariantRepository,
} from 'src/common/interfaces/Products/product_variant.repository.interface';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/common/interfaces/Orders/order.repository.interface';

@Injectable()
export class OrderItemService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepo: OrderItemRepository,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: ProductVariantRepository,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepo: OrderRepository,
  ) {}
  async create(orderId: string, createOrderItemDto: CreateOrderItemDto) {
    const variant = await this.productVariantRepo.findById(
      createOrderItemDto.product_variant_id,
    );
    if (!variant) throw new NotFoundException('product variant not found');

    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new NotFoundException('order not found');

    const orderItem = await this.orderItemRepo.createAndSave({
      order_id: orderId,
      product_variant_id: createOrderItemDto.product_variant_id,
      quantity: createOrderItemDto.quantity,
      price: 0,
    });
    return plainToInstance(OrderItem, orderItem);
  }

  async findById(id: string) {
    const orderItem = await this.orderItemRepo.findById(id);
    if (!orderItem) throw new NotFoundException('orderItem not found');
    return plainToInstance(OrderItem, orderItem);
  }

  async findByOrder(orderId: string) {
    const orderItem = await this.orderItemRepo.findByOrder(orderId);
    return orderItem.map((o) => plainToInstance(OrderItem, o));
  }

  async findByOrderAndVariant(orderId: string, productVariantId: string) {
    const orderItem = await this.orderItemRepo.findByOrderAndVariant(
      orderId,
      productVariantId,
    );
    return orderItem.map((o) => plainToInstance(OrderItem, o));
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findById(id);
    if (!orderItem) throw new NotFoundException('orderItem not found');
    if (updateOrderItemDto.product_variant_id !== undefined)
      orderItem.product_variant_id = updateOrderItemDto.product_variant_id;
    if (updateOrderItemDto.quantity !== undefined)
      orderItem.quantity = updateOrderItemDto.quantity;
    const saved = await this.orderItemRepo.save(orderItem);
    return plainToInstance(OrderItem, saved);
  }

  async remove(id: string) {
    const orderItem = await this.orderItemRepo.findById(id);
    if (!orderItem) throw new NotFoundException('orderItem not found');
    await this.orderItemRepo.remove(orderItem);
    return { deleted: true };
  }
}
