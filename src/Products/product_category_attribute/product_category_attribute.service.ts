import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductCategoryAttributeDto } from './dto/create-product_category_attribute.dto';
import { UpdateProductCategoryAttributeDto } from './dto/update-product_category_attribute.dto';
import {
  PRODUCT_CATEGORY_ATTRIBUTE,
  ProductCategoryAttributeRepository,
} from 'src/common/interfaces/Products/product_category_attribute.repository.interface';
import { plainToInstance } from 'class-transformer';
import { ProductCategoryAttribute } from './entities/product_category_attribute.entity';

@Injectable()
export class ProductCategoryAttributeService {
  constructor(
    @Inject(PRODUCT_CATEGORY_ATTRIBUTE)
    private readonly productCategoryAttributeRepo: ProductCategoryAttributeRepository,
  ) {}
  async create(
    createProductCategoryAttributeDto: CreateProductCategoryAttributeDto,
  ) {
    const exists =
      await this.productCategoryAttributeRepo.findByCategoryAndAttribute(
        createProductCategoryAttributeDto.product_category_id,
        createProductCategoryAttributeDto.product_attribute_id,
      );

    if (exists.length > 0) {
      throw new BadRequestException(
        'attribute already exists for this category',
      );
    }
    const productCategoryAttribute =
      await this.productCategoryAttributeRepo.createAndSave(
        createProductCategoryAttributeDto,
      );
    return plainToInstance(ProductCategoryAttribute, productCategoryAttribute);
  }

  async findById(id: string) {
    const productCategoryAttribute =
      await this.productCategoryAttributeRepo.findById(id);
    if (!productCategoryAttribute)
      throw new NotFoundException(`productCategoryAttribute not found`);
    return plainToInstance(ProductCategoryAttribute, productCategoryAttribute);
  }

  async findByCategory(categoryId: string) {
    const prodcutAttributeValue =
      await this.productCategoryAttributeRepo.findByCategory(categoryId);
    return prodcutAttributeValue.map((p) =>
      plainToInstance(ProductCategoryAttribute, p),
    );
  }

  async findByCategoryAndAttribute(categoryId: string, attributeId: string) {
    const prodcutAttributeValue =
      await this.productCategoryAttributeRepo.findByCategoryAndAttribute(
        categoryId,
        attributeId,
      );
    return prodcutAttributeValue.map((p) =>
      plainToInstance(ProductCategoryAttribute, p),
    );
  }

  async update(
    id: string,
    updateProductCategoryAttributeDto: UpdateProductCategoryAttributeDto,
  ) {
    const productCategoryAttribute =
      await this.productCategoryAttributeRepo.findById(id);
    if (!productCategoryAttribute)
      throw new NotFoundException(`productCategoryAttribute not found`);
    if (updateProductCategoryAttributeDto.is_required !== undefined)
      productCategoryAttribute.is_required =
        updateProductCategoryAttributeDto.is_required;
    const saved = await this.productCategoryAttributeRepo.save(
      productCategoryAttribute,
    );
    return plainToInstance(ProductCategoryAttribute, saved);
  }

  async remove(id: string) {
    const productCategoryAttribute =
      await this.productCategoryAttributeRepo.findById(id);
    if (!productCategoryAttribute)
      throw new NotFoundException(`productCategoryAttribute not found`);
    await this.productCategoryAttributeRepo.remove(productCategoryAttribute);
    return { deleted: true };
  }
}
