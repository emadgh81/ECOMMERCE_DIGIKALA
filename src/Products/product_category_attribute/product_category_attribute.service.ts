import { Injectable } from '@nestjs/common';
import { CreateProductCategoryAttributeDto } from './dto/create-product_category_attribute.dto';
import { UpdateProductCategoryAttributeDto } from './dto/update-product_category_attribute.dto';

@Injectable()
export class ProductCategoryAttributeService {
  create(createProductCategoryAttributeDto: CreateProductCategoryAttributeDto) {
    return 'This action adds a new categoryAttribute';
  }

  findAll() {
    return `This action returns all categoryAttribute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryAttribute`;
  }

  update(
    id: number,
    updateProductCategoryAttributeDto: UpdateProductCategoryAttributeDto,
  ) {
    return `This action updates a #${id} categoryAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryAttribute`;
  }
}
