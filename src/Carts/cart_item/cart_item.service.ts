import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import {
  CART_ITEM_REPOSITORY,
  CartItemRepository,
} from 'src/common/interfaces/Carts/cart_item.repository.interface';
import { plainToInstance } from 'class-transformer';
import { CartItem } from './entities/cart_item.entity';
import {
  PRODUCT_VARIANT_REPOSITORY,
  ProductVariantRepository,
} from 'src/common/interfaces/Products/product_variant.repository.interface';
import {
  CART_REPOSITORY,
  CartRepository,
} from 'src/common/interfaces/Carts/cart.repository.interface';

@Injectable()
export class CartItemService {
  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly cartItemRepo: CartItemRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,

    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: ProductVariantRepository,
  ) {}
  async create(userId: string, createCartItemDto: CreateCartItemDto) {
    const { product_variant_id, quantity } = createCartItemDto;

    const cart = await this.cartRepo.findActiveByUser(userId);
    if (!cart) throw new NotFoundException(' user cart not found');

    const variant = await this.productVariantRepo.findById(product_variant_id);
    if (!variant) throw new NotFoundException('product variant not found');

    const existingItems = await this.cartItemRepo.findByCartAndProductVariant(
      cart.id,
      product_variant_id,
    );

    if (existingItems.length > 0) {
      const item = existingItems[0];
      item.quantity += quantity;

      const saved = await this.cartItemRepo.save(item);
      return plainToInstance(CartItem, saved);
    }

    const cartItem = await this.cartItemRepo.createAndSave({
      cart_id: cart.id,
      product_variant_id,
      quantity,
    });

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
