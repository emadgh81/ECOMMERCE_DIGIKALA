import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryAttributeRepository } from 'src/common/interfaces/Products/product_category_attribute.repository.interface';
import { ProductCategoryAttribute } from '../entities/product_category_attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryAttributePostgresRepository implements ProductCategoryAttributeRepository {
  constructor(
    @InjectRepository(ProductCategoryAttribute)
    private readonly productCategoryAttributeRepo: Repository<ProductCategoryAttribute>,
  ) {}

  findById(id: string) {
    return this.productCategoryAttributeRepo.findOne({ where: { id } });
  }

  findByCategory(productCategoryId: string) {
    return this.productCategoryAttributeRepo.find({
      where: { product_category_id: productCategoryId },
    });
  }

  findByCategoryAndAttribute(
    productCategoryId: string,
    productAttributeId: string,
  ) {
    return this.productCategoryAttributeRepo.find({
      where: {
        product_category_id: productCategoryId,
        product_attribute_id: productAttributeId,
      },
    });
  }

  createAndSave(productCategoryAttribute: Partial<ProductCategoryAttribute>) {
    const ent = this.productCategoryAttributeRepo.create(
      productCategoryAttribute,
    );
    return this.productCategoryAttributeRepo.save(ent);
  }

  save(productCategoryAttribute: ProductCategoryAttribute) {
    return this.productCategoryAttributeRepo.save(productCategoryAttribute);
  }

  async remove(productCategoryAttribute: ProductCategoryAttribute) {
    await this.productCategoryAttributeRepo.remove(productCategoryAttribute);
  }
}
