import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductAttributeDto } from './dto/create-product_attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product_attribute.dto';
import {
  PRODUCT_ATTRIBUTE,
  ProductAttributeRepository,
} from 'src/common/interfaces/Products/product_attribute.repository.interface';
import { plainToInstance } from 'class-transformer';
import { ProductAttribute } from './entities/product_attribute.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @Inject(PRODUCT_ATTRIBUTE)
    private readonly productAttributeRepo: ProductAttributeRepository,
  ) {}
  async create(createProductAttributeDto: CreateProductAttributeDto) {
    const productAttribute = await this.productAttributeRepo.createAndSave({
      title: createProductAttributeDto.title,
      data_type: createProductAttributeDto.data_type,
      unit: createProductAttributeDto.unit,
      searchable: createProductAttributeDto.searchable,
      filterable: createProductAttributeDto.filterable,
    });
    return plainToInstance(ProductAttribute, productAttribute);
  }

  async findAll() {
    const productAttributes = await this.productAttributeRepo.findAll();
    return productAttributes.map((p) => plainToInstance(ProductAttribute, p));
  }

  async findById(id: string) {
    const productAttribute = await this.productAttributeRepo.findById(id);
    if (!productAttribute)
      throw new NotFoundException('productAttribute not found');
    return plainToInstance(ProductAttribute, productAttribute);
  }

  async update(
    id: string,
    updateProductAttributeDto: UpdateProductAttributeDto,
  ) {
    const productAttribute = await this.productAttributeRepo.findById(id);
    if (!productAttribute)
      throw new NotFoundException('productAttribute not found');
    if (updateProductAttributeDto.title !== undefined)
      productAttribute.title = updateProductAttributeDto.title;
    if (updateProductAttributeDto.data_type !== undefined)
      productAttribute.data_type = updateProductAttributeDto.data_type;
    if (updateProductAttributeDto.unit !== undefined)
      productAttribute.unit = updateProductAttributeDto.unit;
    if (updateProductAttributeDto.searchable !== undefined)
      productAttribute.searchable = updateProductAttributeDto.searchable;
    if (updateProductAttributeDto.filterable !== undefined)
      productAttribute.filterable = updateProductAttributeDto.filterable;

    const saved = await this.productAttributeRepo.save(productAttribute);
    return plainToInstance(ProductAttribute, saved);
  }

  async remove(id: string) {
    const productAttribute = await this.productAttributeRepo.findById(id);
    if (!productAttribute)
      throw new NotFoundException('productAttribute not found');

    await this.productAttributeRepo.remove(productAttribute);
    return { deleted: true };
  }
}
