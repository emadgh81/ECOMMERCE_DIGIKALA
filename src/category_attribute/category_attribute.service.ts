import { Injectable } from '@nestjs/common';
import { CreateCategoryAttributeDto } from './dto/create-category_attribute.dto';
import { UpdateCategoryAttributeDto } from './dto/update-category_attribute.dto';

@Injectable()
export class CategoryAttributeService {
  create(createCategoryAttributeDto: CreateCategoryAttributeDto) {
    return 'This action adds a new categoryAttribute';
  }

  findAll() {
    return `This action returns all categoryAttribute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryAttribute`;
  }

  update(id: number, updateCategoryAttributeDto: UpdateCategoryAttributeDto) {
    return `This action updates a #${id} categoryAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryAttribute`;
  }
}
