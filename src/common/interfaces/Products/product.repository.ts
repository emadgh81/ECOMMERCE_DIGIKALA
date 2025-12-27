import { Product } from 'src/Products/product/entities/product.entity';

export const PRODUCT_REPOSITORY = 'IProductRepository';
export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findBySeller(sellerId: string): Promise<Product[]>;
  findByCategory(categoryId: string): Promise<Product[]>;
  createAndSave(product: Partial<Product>): Promise<Product>;
  save(product: Product): Promise<Product>;
  remove(product: Product): Promise<void>;
}
