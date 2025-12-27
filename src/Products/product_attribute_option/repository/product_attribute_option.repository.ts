import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeOptionRepository } from 'src/common/interfaces/Products/product_attribute_option.repository.interface';
import { ProductAttributeOption } from '../entities/product_attribute_option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeOptionPostgresRepository implements ProductAttributeOptionRepository {
  constructor(
    @InjectRepository(ProductAttributeOption)
    private readonly productAttributeOptionRepo: Repository<ProductAttributeOption>,
  ) {}

  findAll() {
    return this.productAttributeOptionRepo.find();
  }

  findById(id: string) {
    return this.productAttributeOptionRepo.findOne({ where: { id } });
  }

  findByAttribute(productAttributeId: string) {
    return this.productAttributeOptionRepo.find({
      where: { product_attribute_id: productAttributeId },
    });
  }

  findByCode(code: string) {
    return this.productAttributeOptionRepo.findOne({ where: { code } });
  }

  createAndSave(productAttributeOption: Partial<ProductAttributeOption>) {
    const ent = this.productAttributeOptionRepo.create(productAttributeOption);
    return this.productAttributeOptionRepo.save(ent);
  }

  save(productAttributeOption: ProductAttributeOption) {
    return this.productAttributeOptionRepo.save(productAttributeOption);
  }

  async remove(productAttributeOption: ProductAttributeOption) {
    await this.productAttributeOptionRepo.remove(productAttributeOption);
  }
}
