import { Module } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order_item.entity';
import { OrderItemPostgresRepository } from './repository/order_item.repository';
import { ORDER_ITEM_REPOSITORY } from 'src/common/interfaces/Orders/order_item.repository.interface';
import { OrderModule } from '../order/order.module';
import { ProductVariantModule } from 'src/Products/product_variant/product_variant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    OrderModule,
    ProductVariantModule,
  ],
  controllers: [OrderItemController],
  providers: [
    OrderItemService,
    OrderItemPostgresRepository,
    { provide: ORDER_ITEM_REPOSITORY, useClass: OrderItemPostgresRepository },
  ],
  exports: [ORDER_ITEM_REPOSITORY],
})
export class OrderItemModule {}
