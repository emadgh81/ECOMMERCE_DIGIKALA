import { ProductCategory } from 'src/Products/product_category/entities/product_category.entity';

export const PRODUCT_CATEGORY = 'IProductCategoryRepository';
export interface ProductCategoryRepository {
  findAll(): Promise<ProductCategory[]>;
  findById(id: string): Promise<ProductCategory | null>;
  createAndSave(
    productCategory: Partial<ProductCategory>,
  ): Promise<ProductCategory>;
  save(productCategory: ProductCategory): Promise<ProductCategory>;
  remove(productCategory: ProductCategory): Promise<void>;
}
