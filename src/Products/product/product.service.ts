import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/common/interfaces/Products/product.repository';
import { plainToInstance } from 'class-transformer';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {}
  async create(sellerId: string, createProductDto: CreateProductDto) {
    const product = await this.productRepo.createAndSave({
      seller_id: sellerId,
      title: createProductDto.title,
      price: createProductDto.price,
      brand: createProductDto.brand,
      description: createProductDto.description,
    });

    return plainToInstance(Product, product);
  }

  async findAll() {
    const product = await this.productRepo.findAll();
    return product.map((p) => plainToInstance(Product, p));
  }

  async findById(id: string) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('product not found');
    return plainToInstance(Product, product);
  }

  async findBySeller(sellerId: string) {
    const products = await this.productRepo.findBySeller(sellerId);
    return products.map((p) => plainToInstance(Product, p));
  }

  async findByCategory(categoryId: string) {
    const products = await this.productRepo.findByCategory(categoryId);
    return products.map((p) => plainToInstance(Product, p));
  }

  async update(
    id: string,
    sellerId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('product not found');
    if (product.seller_id !== sellerId)
      throw new ForbiddenException('access denied');
    if (updateProductDto.title !== undefined)
      product.title = updateProductDto.title;
    if (updateProductDto.price !== undefined)
      product.price = updateProductDto.price;
    if (updateProductDto.brand !== undefined)
      product.brand = updateProductDto.brand;
    if (updateProductDto.description !== undefined)
      product.description = updateProductDto.description;

    const saved = await this.productRepo.save(product);
    return plainToInstance(Product, saved);
  }

  async remove(id: string, sellerId: string) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('product not found');
    if (product.seller_id !== sellerId)
      throw new ForbiddenException('access denied');
    await this.productRepo.remove(product);
    return { deleted: true };
  }
}
