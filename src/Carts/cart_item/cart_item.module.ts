import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { CartItemPostgresRepository } from './repository/cart_item.repository';
import { CART_ITEM_REPOSITORY } from 'src/common/interfaces/Carts/cart_item.repository.interface';
import { CartModule } from '../cart/cart.module';
import { ProductVariantModule } from 'src/Products/product_variant/product_variant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    CartModule,
    ProductVariantModule,
  ],
  controllers: [CartItemController],
  providers: [
    CartItemService,
    CartItemPostgresRepository,
    { provide: CART_ITEM_REPOSITORY, useClass: CartItemPostgresRepository },
  ],
  exports: [CART_ITEM_REPOSITORY],
})
export class CartItemModule {}
