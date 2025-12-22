import { Injectable } from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product_attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product_attribute.dto';

@Injectable()
export class ProductAttributeService {
  create(createProductAttributeDto: CreateProductAttributeDto) {
    return 'This action adds a new attribute';
  }

  findAll() {
    return `This action returns all attribute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  update(id: number, updateProductAttributeDto: UpdateProductAttributeDto) {
    return `This action updates a #${id} attribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
