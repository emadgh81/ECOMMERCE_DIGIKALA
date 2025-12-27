import { ProductAttributeValue } from 'src/Products/product_attribute_value/entities/product_attribute_value.entity';

export const PRODUCT_ATTRIBUTE_VALUE = 'IProductAttributeValueRepository';
export interface ProductAttributeValueRepository {
  findById(id: string): Promise<ProductAttributeValue | null>;
  findByProduct(productId: string): Promise<ProductAttributeValue[]>;
  findByProductAndAttribute(
    productId: string,
    productAttributeId: string,
  ): Promise<ProductAttributeValue | null>;
  createAndSave(
    prodcutAttributeValue: Partial<ProductAttributeValue>,
  ): Promise<ProductAttributeValue>;
  save(
    prodcutAttributeValue: ProductAttributeValue,
  ): Promise<ProductAttributeValue>;
  remove(prodcutAttributeValue: ProductAttributeValue): Promise<void>;
}
