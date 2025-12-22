import { Injectable } from '@nestjs/common';
import { CreateProductVariantAttributeDto } from './dto/create-product_variant_attribute.dto';
import { UpdateProductVariantAttributeDto } from './dto/update-product_variant_attribute.dto';

@Injectable()
export class ProductVariantAttributeService {
  create(createProductVariantAttributeDto: CreateProductVariantAttributeDto) {
    return 'This action adds a new variantAttribute';
  }

  findAll() {
    return `This action returns all variantAttribute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantAttribute`;
  }

  update(
    id: number,
    updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    return `This action updates a #${id} variantAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantAttribute`;
  }
}
