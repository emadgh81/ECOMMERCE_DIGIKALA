import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';
import {
  PRODUCT_VARIANT_REPOSITORY,
  ProductVariantRepository,
} from 'src/common/interfaces/Products/product_variant.repository.interface';
import { plainToInstance } from 'class-transformer';
import { ProductVariant } from './entities/product_variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: ProductVariantRepository,
  ) {}
  async create(
    productId: string,
    createProductVariantDto: CreateProductVariantDto,
  ) {
    const productVariant = await this.productVariantRepo.createAndSave({
      sku: createProductVariantDto.sku,
      price: createProductVariantDto.price,
      stock: createProductVariantDto.stock,
      product_id: productId,
    });
    return plainToInstance(ProductVariant, productVariant);
  }

  async findById(id: string) {
    const productVariant = await this.productVariantRepo.findById(id);
    if (!productVariant)
      throw new NotFoundException('productVariant not found');
    return plainToInstance(ProductVariant, productVariant);
  }

  async findByProduct(productId: string) {
    const productVariant =
      await this.productVariantRepo.findByProduct(productId);
    return productVariant.map((p) => plainToInstance(ProductVariant, p));
  }

  async findBySku(sku: string) {
    const productVariant = await this.productVariantRepo.findBySku(sku);
    if (!productVariant) throw new NotFoundException(`sku not found`);
    return plainToInstance(ProductVariant, productVariant);
  }

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    const productVariant = await this.productVariantRepo.findById(id);
    if (!productVariant)
      throw new NotFoundException('productVariant not found');
    if (updateProductVariantDto.price !== undefined)
      productVariant.price = updateProductVariantDto.price;
    if (updateProductVariantDto.sku !== undefined)
      productVariant.sku = updateProductVariantDto.sku;
    if (updateProductVariantDto.stock !== undefined)
      productVariant.stock = updateProductVariantDto.stock;
    const saved = await this.productVariantRepo.save(productVariant);
    return plainToInstance(ProductVariant, saved);
  }

  async remove(id: string) {
    const productVariant = await this.productVariantRepo.findById(id);
    if (!productVariant)
      throw new NotFoundException('productVariant not found');
    await this.productVariantRepo.remove(productVariant);
    return { deleted: true };
  }
}
