import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductAttributeOptionDto } from './dto/create-product_attribute_option.dto';
import { UpdateProductAttributeOptionDto } from './dto/update-product_attribute_option.dto';
import { ProductAttributeOption } from './entities/product_attribute_option.entity';
import {
  PRODUCT_ATTRIBUTE_OPTION,
  ProductAttributeOptionRepository,
} from 'src/common/interfaces/Products/product_attribute_option.repository.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductAttributeOptionService {
  constructor(
    @Inject(PRODUCT_ATTRIBUTE_OPTION)
    private readonly productAttributeOptionRepo: ProductAttributeOptionRepository,
  ) {}
  async create(
    productAttributeId: string,
    createProductAttributeOptionDto: CreateProductAttributeOptionDto,
  ) {
    const productAttributeOption =
      await this.productAttributeOptionRepo.createAndSave({
        product_attribute_id: productAttributeId,
        title: createProductAttributeOptionDto.title,
        code: createProductAttributeOptionDto.code,
        color: createProductAttributeOptionDto.color,
        image: createProductAttributeOptionDto.image,
      });
    return plainToInstance(ProductAttributeOption, productAttributeOption);
  }

  async findAll() {
    const productAttributeOptions =
      await this.productAttributeOptionRepo.findAll();
    return productAttributeOptions.map((p) =>
      plainToInstance(ProductAttributeOption, p),
    );
  }

  async findById(id: string) {
    const productAttributeOption =
      await this.productAttributeOptionRepo.findById(id);
    if (!productAttributeOption)
      throw new NotFoundException(`productAttributeOption not found`);
    return plainToInstance(ProductAttributeOption, productAttributeOption);
  }

  async findByAttribute(attributeId: string) {
    const productAttributeOption =
      await this.productAttributeOptionRepo.findByAttribute(attributeId);
    return productAttributeOption.map((p) =>
      plainToInstance(ProductAttributeOption, p),
    );
  }

  async findByCode(code: string) {
    const productAttributeOption =
      await this.productAttributeOptionRepo.findByCode(code);
    if (!productAttributeOption)
      throw new NotFoundException(`productAttributeOption not found`);
    return plainToInstance(ProductAttributeOption, productAttributeOption);
  }

  async update(
    id: string,
    updateProductAttributeOptionDto: UpdateProductAttributeOptionDto,
  ) {
    const productAttributeOption =
      await this.productAttributeOptionRepo.findById(id);
    if (!productAttributeOption)
      throw new NotFoundException(`productAttributeOption not found`);
    if (updateProductAttributeOptionDto.title !== undefined)
      productAttributeOption.title = updateProductAttributeOptionDto.title;
    if (updateProductAttributeOptionDto.code !== undefined)
      productAttributeOption.code = updateProductAttributeOptionDto.code;
    if (updateProductAttributeOptionDto.color !== undefined)
      productAttributeOption.color = updateProductAttributeOptionDto.color;
    if (updateProductAttributeOptionDto.image !== undefined)
      productAttributeOption.image = updateProductAttributeOptionDto.image;

    const saved = await this.productAttributeOptionRepo.save(
      productAttributeOption,
    );
    return plainToInstance(ProductAttributeOption, saved);
  }

  async remove(id: string) {
    const productAttributeOption =
      await this.productAttributeOptionRepo.findById(id);
    if (!productAttributeOption)
      throw new NotFoundException(`productAttributeOption not found`);
    await this.productAttributeOptionRepo.remove(productAttributeOption);
    return { deleted: true };
  }
}
