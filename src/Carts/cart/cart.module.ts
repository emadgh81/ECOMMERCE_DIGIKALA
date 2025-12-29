import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartPostgresRepository } from './repository/cart.repository';
import { CART_REPOSITORY } from 'src/common/interfaces/Carts/cart.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [
    CartService,
    CartPostgresRepository,
    { provide: CART_REPOSITORY, useClass: CartPostgresRepository },
  ],
  exports: [CART_REPOSITORY],
})
export class CartModule {}
