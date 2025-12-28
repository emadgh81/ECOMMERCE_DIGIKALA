import { ProductVariant } from 'src/Products/product_variant/entities/product_variant.entity';

export const PRODUCT_VARIANT_REPOSITORY = 'IProductVariantRepository';
export interface ProductVariantRepository {
  findById(id: string): Promise<ProductVariant | null>;
  findByProduct(productId: string): Promise<ProductVariant[]>;
  findBySku(sku: string): Promise<ProductVariant | null>;
  createAndSave(
    productVariant: Partial<ProductVariant>,
  ): Promise<ProductVariant>;
  save(productVariant: ProductVariant): Promise<ProductVariant>;
  remove(productVariant: ProductVariant): Promise<void>;
}
