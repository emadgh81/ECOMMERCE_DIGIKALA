import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/common/interfaces/Products/product.repository';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductPostgresRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findById(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  findBySeller(sellerId: string) {
    return this.productRepo.find({ where: { seller_id: sellerId } });
  }

  findByCategory(categoryId: string) {
    return this.productRepo.find({
      where: { product_category_id: categoryId },
    });
  }

  createAndSave(product: Partial<Product>) {
    const ent = this.productRepo.create(product);
    return this.productRepo.save(ent);
  }

  save(product: Product) {
    return this.productRepo.save(product);
  }

  async remove(product: Product) {
    await this.productRepo.remove(product);
  }
}
