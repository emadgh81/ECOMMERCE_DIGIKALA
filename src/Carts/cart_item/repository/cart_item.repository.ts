import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemRepository } from 'src/common/interfaces/Carts/cart_item.repository.interface';
import { CartItem } from '../entities/cart_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemPostgresRepository implements CartItemRepository {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) {}

  findById(id: string) {
    return this.cartItemRepo.findOne({ where: { id } });
  }

  findByCart(cartId: string) {
    return this.cartItemRepo.find({ where: { cart_id: cartId } });
  }

  findByCartAndProductVariant(cartId: string, productVariantId: string) {
    return this.cartItemRepo.find({
      where: {
        cart_id: cartId,
        product_variant_id: productVariantId,
      },
    });
  }

  createAndSave(cartItem: Partial<CartItem>) {
    const ent = this.cartItemRepo.create(cartItem);
    return this.cartItemRepo.save(ent);
  }

  save(cartItem: CartItem) {
    return this.cartItemRepo.save(cartItem);
  }

  async remove(cartItem: CartItem) {
    await this.cartItemRepo.remove(cartItem);
  }
}
