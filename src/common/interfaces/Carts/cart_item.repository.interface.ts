import { CartItem } from 'src/Carts/cart_item/entities/cart_item.entity';

export const CART_ITEM_REPOSITORY = 'ICartItemRepository';
export interface CartItemRepository {
  findById(id: string): Promise<CartItem | null>;
  findByCart(cartId: string): Promise<CartItem[]>;
  findByCartAndProductVariant(
    cartId: string,
    productVariantId: string,
  ): Promise<CartItem[]>;
  createAndSave(cartItem: Partial<CartItem>): Promise<CartItem>;
  save(cartItem: CartItem): Promise<CartItem>;
  remove(cartItem: CartItem): Promise<void>;
}
