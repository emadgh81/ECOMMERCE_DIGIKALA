import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductVariantAttributeDto } from './dto/create-product_variant_attribute.dto';
import { UpdateProductVariantAttributeDto } from './dto/update-product_variant_attribute.dto';
import { ProductVariantAttribute } from './entities/product_variant_attribute.entity';
import {
  PRODUCT_VARIANT_ATTRIBUTE_REPOSITORY,
  ProductVariantAttributeRepository,
} from 'src/common/interfaces/Products/product_variant_attribute.repository.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductVariantAttributeService {
  constructor(
    @Inject(PRODUCT_VARIANT_ATTRIBUTE_REPOSITORY)
    private readonly productVariantAttributeRepo: ProductVariantAttributeRepository,
  ) {}
  async create(
    createProductVariantAttributeDto: CreateProductVariantAttributeDto,
  ) {
    const exists =
      await this.productVariantAttributeRepo.findByVariantAttributeAndOption(
        createProductVariantAttributeDto.product_variant_id,
        createProductVariantAttributeDto.product_attribute_id,
        createProductVariantAttributeDto.product_attribute_option_id,
      );
    if (exists.length > 0)
      throw new BadRequestException(
        'his attribute already exists for this variant',
      );
    const productVariantAttribute =
      await this.productVariantAttributeRepo.createAndSave(
        createProductVariantAttributeDto,
      );
    return plainToInstance(ProductVariantAttribute, productVariantAttribute);
  }

  async findById(id: string) {
    const productVariantAttribute =
      await this.productVariantAttributeRepo.findById(id);
    if (!productVariantAttribute)
      throw new NotFoundException('productVariantAttribute not found');
    return plainToInstance(ProductVariantAttribute, productVariantAttribute);
  }

  async findByVariant(variantId: string) {
    const productVariantAttribute =
      await this.productVariantAttributeRepo.findByVariant(variantId);
    return productVariantAttribute.map((p) =>
      plainToInstance(ProductVariantAttribute, p),
    );
  }

  async findByVariantAndAttribute(variantId: string, attributeId: string) {
    const productVariantAttribute =
      await this.productVariantAttributeRepo.findByVariantAndAttribute(
        variantId,
        attributeId,
      );
    return productVariantAttribute.map((p) =>
      plainToInstance(ProductVariantAttribute, p),
    );
  }

  async update(
    id: string,
    updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    const productVariantAttribute =
      await this.productVariantAttributeRepo.findById(id);
    if (!productVariantAttribute)
      throw new NotFoundException('productVariantAttribute not found');
    if (updateProductVariantAttributeDto.product_attribute_id !== undefined)
      productVariantAttribute.product_attribute_id =
        updateProductVariantAttributeDto.product_attribute_id;
    if (
      updateProductVariantAttributeDto.product_attribute_option_id !== undefined
    )
      productVariantAttribute.product_attribute_option_id =
        updateProductVariantAttributeDto.product_attribute_option_id;
    if (updateProductVariantAttributeDto.product_variant_id !== undefined)
      productVariantAttribute.product_variant_id =
        updateProductVariantAttributeDto.product_variant_id;

    const saved = await this.productVariantAttributeRepo.save(
      productVariantAttribute,
    );
    return plainToInstance(ProductVariantAttribute, saved);
  }

  async remove(id: string) {
    const productVariantAttribute =
      await this.productVariantAttributeRepo.findById(id);
    if (!productVariantAttribute)
      throw new NotFoundException('productVariantAttribute not found');
    await this.productVariantAttributeRepo.remove(productVariantAttribute);
    return { deleted: true };
  }
}
