import { ProductAttribute } from 'src/Products/product_attribute/entities/product_attribute.entity';

export const PRODUCT_ATTRIBUTE = 'IProductAttributeRepository';
export interface ProductAttributeRepository {
  findAll(): Promise<ProductAttribute[]>;
  findById(id: string): Promise<ProductAttribute | null>;
  createAndSave(
    productAttribute: Partial<ProductAttribute>,
  ): Promise<ProductAttribute>;
  save(productAttribute: ProductAttribute): Promise<ProductAttribute>;
  remove(productAttribute: ProductAttribute): Promise<void>;
}
