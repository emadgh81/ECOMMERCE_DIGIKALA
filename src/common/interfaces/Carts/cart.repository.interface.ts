import { Cart } from 'src/Carts/cart/entities/cart.entity';

export const CART_REPOSITORY = 'ICartRepository';
export interface CartRepository {
  findAll(): Promise<Cart[]>;
  findById(id: string): Promise<Cart | null>;
  findByUser(userId: string): Promise<Cart[]>;
  createAndSave(cart: Partial<Cart>): Promise<Cart>;
  save(cart: Cart): Promise<Cart>;
  remove(cart: Cart): Promise<void>;
}
