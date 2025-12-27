import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeRepository } from 'src/common/interfaces/Products/product_attribute.repository.interface';
import { ProductAttribute } from '../entities/product_attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributePostgresRepository implements ProductAttributeRepository {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly productAttributeRepo: Repository<ProductAttribute>,
  ) {}

  findAll() {
    return this.productAttributeRepo.find();
  }

  findById(id: string) {
    return this.productAttributeRepo.findOne({ where: { id } });
  }

  createAndSave(productAttribute: Partial<ProductAttribute>) {
    const ent = this.productAttributeRepo.create(productAttribute);
    return this.productAttributeRepo.save(ent);
  }

  save(productAttribute: ProductAttribute) {
    return this.productAttributeRepo.save(productAttribute);
  }

  async remove(productAttribute: ProductAttribute) {
    await this.productAttributeRepo.remove(productAttribute);
  }
}
