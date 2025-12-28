import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductAttributeValueDto } from './dto/create-product_attribute_value.dto';
import { UpdateProductAttributeValueDto } from './dto/update-product_attribute_value.dto';
import {
  PRODUCT_ATTRIBUTE_VALUE,
  ProductAttributeValueRepository,
} from 'src/common/interfaces/Products/product_attribute_value.repository.interface';
import { plainToInstance } from 'class-transformer';
import { ProductAttributeValue } from './entities/product_attribute_value.entity';

@Injectable()
export class ProductAttributeValueService {
  constructor(
    @Inject(PRODUCT_ATTRIBUTE_VALUE)
    private readonly productAttributeValueRepo: ProductAttributeValueRepository,
  ) {}
  async create(createProductAttributeValueDto: CreateProductAttributeValueDto) {
    const exists =
      await this.productAttributeValueRepo.findByProductAndAttribute(
        createProductAttributeValueDto.product_id,
        createProductAttributeValueDto.product_attribute_id,
      );

    if (exists) {
      throw new BadRequestException(
        'attribute value already exists for this product',
      );
    }
    const prodcutAttributeValue =
      await this.productAttributeValueRepo.createAndSave(
        createProductAttributeValueDto,
      );
    return plainToInstance(ProductAttributeValue, prodcutAttributeValue);
  }

  async findById(id: string) {
    const prodcutAttributeValue =
      await this.productAttributeValueRepo.findById(id);
    if (!prodcutAttributeValue)
      throw new NotFoundException('prodcutAttributeValue not found');
    return plainToInstance(ProductAttributeValue, prodcutAttributeValue);
  }

  async findByProduct(productId: string) {
    const prodcutAttributeValue =
      await this.productAttributeValueRepo.findByProduct(productId);
    return prodcutAttributeValue.map((p) =>
      plainToInstance(ProductAttributeValue, p),
    );
  }

  async findByProductAndAttribute(productId: string, attributeId: string) {
    const prodcutAttributeValue =
      await this.productAttributeValueRepo.findByProductAndAttribute(
        productId,
        attributeId,
      );
    return prodcutAttributeValue.map((p) =>
      plainToInstance(ProductAttributeValue, p),
    );
  }

  async update(
    id: string,
    updateProductAttributeValueDto: UpdateProductAttributeValueDto,
  ) {
    const prodcutAttributeValue =
      await this.productAttributeValueRepo.findById(id);
    if (!prodcutAttributeValue)
      throw new NotFoundException('prodcutAttributeValue not found');
    if (updateProductAttributeValueDto.value !== undefined)
      prodcutAttributeValue.value = updateProductAttributeValueDto.value;
    const saved = await this.productAttributeValueRepo.save(
      prodcutAttributeValue,
    );
    return plainToInstance(ProductAttributeValue, saved);
  }

  async remove(id: string) {
    const prodcutAttributeValue =
      await this.productAttributeValueRepo.findById(id);
    if (!prodcutAttributeValue)
      throw new NotFoundException('prodcutAttributeValue not found');
    await this.productAttributeValueRepo.remove(prodcutAttributeValue);
    return { deleted: true };
  }
}
