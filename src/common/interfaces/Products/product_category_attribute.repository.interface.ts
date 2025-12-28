import { ProductCategoryAttribute } from 'src/Products/product_category_attribute/entities/product_category_attribute.entity';

export const PRODUCT_CATEGORY_ATTRIBUTE = 'IProductCategoryAttributeRepository';
export interface ProductCategoryAttributeRepository {
  findById(id: string): Promise<ProductCategoryAttribute | null>;
  findByCategory(
    productCategoryId: string,
  ): Promise<ProductCategoryAttribute[]>;
  findByCategoryAndAttribute(
    productCategoryId: string,
    productAttributeId: string,
  ): Promise<ProductCategoryAttribute[]>;
  createAndSave(
    productCategoryAttribute: Partial<ProductCategoryAttribute>,
  ): Promise<ProductCategoryAttribute>;
  save(
    productCategoryAttribute: ProductCategoryAttribute,
  ): Promise<ProductCategoryAttribute>;
  remove(productCategoryAttribute: ProductCategoryAttribute): Promise<void>;
}
