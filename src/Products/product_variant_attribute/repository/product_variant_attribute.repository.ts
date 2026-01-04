import { Injectable } from '@nestjs/common';
import { ProductVariantAttributeRepository } from 'src/common/interfaces/Products/product_variant_attribute.repository.interface';
import { ProductVariantAttribute } from '../entities/product_variant_attribute.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductVariantAttributePostgresRepository implements ProductVariantAttributeRepository {
  constructor(
    @InjectRepository(ProductVariantAttribute)
    private readonly productVariantRepo: Repository<ProductVariantAttribute>,
  ) {}

  findById(id: string) {
    return this.productVariantRepo.findOne({ where: { id } });
  }

  findByVariant(productVariantId: string) {
    return this.productVariantRepo.find({
      where: { product_variant_id: productVariantId },
    });
  }

  findByVariantAndAttribute(variantId: string, attributeId: string) {
    return this.productVariantRepo.find({
      where: {
        product_variant_id: variantId,
        product_attribute_id: attributeId,
      },
    });
  }

  findByVariantAttributeAndOption(
    variantId: string,
    attributeId: string,
    optionId: string,
  ) {
    return this.productVariantRepo.find({
      where: {
        product_variant_id: variantId,
        product_attribute_id: attributeId,
        product_attribute_option_id: optionId,
      },
    });
  }

  createAndSave(productVariantAttribute: Partial<ProductVariantAttribute>) {
    const ent = this.productVariantRepo.create(productVariantAttribute);
    return this.productVariantRepo.save(ent);
  }

  save(productVariantAttribute: ProductVariantAttribute) {
    return this.productVariantRepo.save(productVariantAttribute);
  }

  async remove(productVariantAttribute: ProductVariantAttribute) {
    await this.productVariantRepo.remove(productVariantAttribute);
  }
}
