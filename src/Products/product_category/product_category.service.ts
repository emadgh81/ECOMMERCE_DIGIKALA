import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import {
  PRODUCT_CATEGORY,
  ProductCategoryRepository,
} from 'src/common/interfaces/Products/product_category.repository.interface';
import { plainToInstance } from 'class-transformer';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject(PRODUCT_CATEGORY)
    private readonly productCategoryRepo: ProductCategoryRepository,
  ) {}
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const productCategory = await this.productCategoryRepo.createAndSave({
      title: createProductCategoryDto.title,
    });
    return plainToInstance(ProductCategory, productCategory);
  }

  async findAll() {
    const productCategory = await this.productCategoryRepo.findAll();
    return productCategory.map((p) => plainToInstance(ProductCategory, p));
  }

  async findById(id: string) {
    const productCategory = await this.productCategoryRepo.findById(id);
    if (!productCategory)
      throw new NotFoundException(`productCategory not found`);
    return plainToInstance(ProductCategory, productCategory);
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    const productCategory = await this.productCategoryRepo.findById(id);
    if (!productCategory)
      throw new NotFoundException(`productCategory not found`);
    if (updateProductCategoryDto.title !== undefined)
      productCategory.title = updateProductCategoryDto.title;
    const saved = await this.productCategoryRepo.save(productCategory);
    return plainToInstance(ProductCategory, saved);
  }

  async remove(id: string) {
    const productCategory = await this.productCategoryRepo.findById(id);
    if (!productCategory)
      throw new NotFoundException(`productCategory not found`);
    await this.productCategoryRepo.remove(productCategory);
    return { deleted: true };
  }
}
