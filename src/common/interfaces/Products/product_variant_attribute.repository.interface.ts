import { ProductVariantAttribute } from 'src/Products/product_variant_attribute/entities/product_variant_attribute.entity';

export const PRODUCT_VARIANT_ATTRIBUTE_REPOSITORY =
  'IProductVariantAttributeRepository';
export interface ProductVariantAttributeRepository {
  findById(id: string): Promise<ProductVariantAttribute | null>;
  findByVariant(productVariantId: string): Promise<ProductVariantAttribute[]>;
  findByVariantAndAttribute(
    variantId: string,
    attributeId: string,
  ): Promise<ProductVariantAttribute[]>;
  createAndSave(
    productVariantAttribute: Partial<ProductVariantAttribute>,
  ): Promise<ProductVariantAttribute>;
  save(
    productVariantAttribute: ProductVariantAttribute,
  ): Promise<ProductVariantAttribute>;
  remove(productVariantAttribute: ProductVariantAttribute): Promise<void>;
}
