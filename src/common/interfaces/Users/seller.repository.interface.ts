import { Seller } from 'src/Users/seller/entities/seller.entity';

export const SELLER_REPOSITORY = 'ISellerRepository';
export interface SellerRepository {
  findAll(): Promise<Seller[]>;
  findById(id: string): Promise<Seller | null>;
  findByUserId(userId: string): Promise<Seller | null>;
  createAndSave(seller: Partial<Seller>): Promise<Seller>;
  save(seller: Seller): Promise<Seller>;
  remove(seller: Seller): Promise<void>;
}
