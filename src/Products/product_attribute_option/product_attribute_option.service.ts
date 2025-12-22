import { Injectable } from '@nestjs/common';
import { CreateProductAttributeOptionDto } from './dto/create-product_attribute_option.dto';
import { UpdateProductAttributeOptionDto } from './dto/update-product_attribute_option.dto';

@Injectable()
export class ProductAttributeOptionService {
  create(createProductAttributeOptionDto: CreateProductAttributeOptionDto) {
    return 'This action adds a new attributeOption';
  }

  findAll() {
    return `This action returns all attributeOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attributeOption`;
  }

  update(
    id: number,
    updateProductAttributeOptionDto: UpdateProductAttributeOptionDto,
  ) {
    return `This action updates a #${id} attributeOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributeOption`;
  }
}
