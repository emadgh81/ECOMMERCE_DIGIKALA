import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeValueRepository } from 'src/common/interfaces/Products/product_attribute_value.repository.interface';
import { ProductAttributeValue } from '../entities/product_attribute_value.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeValuePostgresRepository implements ProductAttributeValueRepository {
  constructor(
    @InjectRepository(ProductAttributeValue)
    private readonly productAttributeValueRepo: Repository<ProductAttributeValue>,
  ) {}

  findById(id: string) {
    return this.productAttributeValueRepo.findOne({ where: { id } });
  }

  findByProduct(productId: string) {
    return this.productAttributeValueRepo.find({
      where: { product_id: productId },
    });
  }

  findByProductAndAttribute(productId: string, productAttributeId: string) {
    return this.productAttributeValueRepo.find({
      where: {
        product_id: productId,
        product_attribute_id: productAttributeId,
      },
    });
  }

  createAndSave(prodcutAttributeValue: Partial<ProductAttributeValue>) {
    const ent = this.productAttributeValueRepo.create(prodcutAttributeValue);
    return this.productAttributeValueRepo.save(ent);
  }

  save(prodcutAttributeValue: ProductAttributeValue) {
    return this.productAttributeValueRepo.save(prodcutAttributeValue);
  }

  async remove(prodcutAttributeValue: ProductAttributeValue) {
    await this.productAttributeValueRepo.remove(prodcutAttributeValue);
  }
}
