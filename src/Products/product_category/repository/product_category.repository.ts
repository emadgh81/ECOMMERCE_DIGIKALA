import { Injectable } from '@nestjs/common';
import { ProductCategory } from '../entities/product_category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryRepository } from 'src/common/interfaces/Products/product_category.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryPostgresRepository implements ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepo: Repository<ProductCategory>,
  ) {}
  findAll() {
    return this.productCategoryRepo.find();
  }
  findById(id: string) {
    return this.productCategoryRepo.findOne({ where: { id } });
  }
  createAndSave(productCategory: Partial<ProductCategory>) {
    const ent = this.productCategoryRepo.create(productCategory);
    return this.productCategoryRepo.save(ent);
  }

  save(productCategory: ProductCategory) {
    return this.productCategoryRepo.save(productCategory);
  }

  async remove(productCategory: ProductCategory) {
    await this.productCategoryRepo.remove(productCategory);
  }
}
