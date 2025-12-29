import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import {
  CART_ITEM_REPOSITORY,
  CartItemRepository,
} from 'src/common/interfaces/Carts/cart_item.repository.interface';
import { plainToInstance } from 'class-transformer';
import { CartItem } from './entities/cart_item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly cartItemRepo: CartItemRepository,
  ) {}
  async create(createCartItemDto: CreateCartItemDto) {
    const cartItem = await this.cartItemRepo.createAndSave(createCartItemDto);
    return plainToInstance(CartItem, cartItem);
  }

  async findById(id: string) {
    const cartItem = await this.cartItemRepo.findById(id);
    if (!cartItem) throw new NotFoundException('cartItem not found');
    return plainToInstance(CartItem, cartItem);
  }

  async findByCart(cartId: string) {
    const cartItem = await this.cartItemRepo.findByCart(cartId);
    return cartItem.map((c) => plainToInstance(CartItem, c));
  }

  async findByCartAndProductVariant(cartId: string, productVariantId: string) {
    const cartItem = await this.cartItemRepo.findByCartAndProductVariant(
      cartId,
      productVariantId,
    );
    return cartItem.map((c) => plainToInstance(CartItem, c));
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemRepo.findById(id);
    if (!cartItem) throw new NotFoundException('cartItem not found');
    if (updateCartItemDto.cart_id !== undefined)
      cartItem.cart_id = updateCartItemDto.cart_id;
    if (updateCartItemDto.product_variant_id !== undefined)
      cartItem.product_variant_id = updateCartItemDto.product_variant_id;
    if (updateCartItemDto.quantity !== undefined)
      cartItem.quantity = updateCartItemDto.quantity;
    const saved = await this.cartItemRepo.save(cartItem);
    return plainToInstance(CartItem, saved);
  }

  async remove(id: string) {
    const cartItem = await this.cartItemRepo.findById(id);
    if (!cartItem) throw new NotFoundException('cartItem not found');
    await this.cartItemRepo.remove(cartItem);
    return { deleted: true };
  }
}
