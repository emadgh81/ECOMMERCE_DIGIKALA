import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { plainToInstance } from 'class-transformer';
import { Product } from './entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/common/interfaces/Products/product.repository.interface';
import {
  SELLER_REPOSITORY,
  SellerRepository,
} from 'src/common/interfaces/Users/seller.repository.interface';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/common/interfaces/Users/user.repository.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
    @Inject(SELLER_REPOSITORY) private readonly sellerRepo: SellerRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}
  async create(
    userId: string,
    createProductDto: CreateProductDto,
    categoryId: string,
  ) {
    const seller = await this.sellerRepo.findByUserId(userId);
    if (!seller) throw new ForbiddenException('seller not found');
    const product = await this.productRepo.createAndSave({
      seller_id: seller.id,
      product_category_id: categoryId,
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

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('product not found');
    const seller = await this.sellerRepo.findByUserId(userId);
    if (!seller || product.seller_id !== seller.id) {
      throw new ForbiddenException('access denied');
    }
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

  async remove(id: string, userId: string) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('product not found');
    const seller = await this.sellerRepo.findByUserId(userId);
    if (!seller || product.seller_id !== seller.id) {
      throw new ForbiddenException('access denied');
    }
    await this.productRepo.remove(product);
    return { deleted: true };
  }
}
