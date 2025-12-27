import { ProductAttributeOption } from 'src/Products/product_attribute_option/entities/product_attribute_option.entity';

export const PRODUCT_ATTRIBUTE_OPTION = 'IProductAttributeOptionRepository';
export interface ProductAttributeOptionRepository {
  findAll(): Promise<ProductAttributeOption[]>;
  findById(id: string): Promise<ProductAttributeOption | null>;
  findByAttribute(
    productAttributeId: string,
  ): Promise<ProductAttributeOption[]>;
  findByCode(code: string): Promise<ProductAttributeOption | null>;
  createAndSave(
    productAttributeOption: Partial<ProductAttributeOption>,
  ): Promise<ProductAttributeOption>;
  save(
    productAttributeOption: ProductAttributeOption,
  ): Promise<ProductAttributeOption>;
  remove(productAttributeOption: ProductAttributeOption): Promise<void>;
}
