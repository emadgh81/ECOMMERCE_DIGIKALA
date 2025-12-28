import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariantRepository } from 'src/common/interfaces/Products/product_variant.repository.interface';
import { ProductVariant } from '../entities/product_variant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductVariantPostgresRepository implements ProductVariantRepository {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly productVariantRepo: Repository<ProductVariant>,
  ) {}

  findById(id: string) {
    return this.productVariantRepo.findOne({ where: { id } });
  }

  findByProduct(productId: string) {
    return this.productVariantRepo.find({ where: { product_id: productId } });
  }

  findBySku(sku: string) {
    return this.productVariantRepo.findOne({ where: { sku } });
  }

  createAndSave(productVariant: Partial<ProductVariant>) {
    const ent = this.productVariantRepo.create(productVariant);
    return this.productVariantRepo.save(ent);
  }

  save(productVariant: ProductVariant) {
    return this.productVariantRepo.save(productVariant);
  }

  async remove(productVariant: ProductVariant) {
    await this.productVariantRepo.remove(productVariant);
  }
}
