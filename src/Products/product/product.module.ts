import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductPostgresRepository } from './repository/product.repository';
import { PRODUCT_REPOSITORY } from 'src/common/interfaces/Products/product.repository.interface';
import { SellerModule } from 'src/Users/seller/seller.module';
import { UserModule } from 'src/Users/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SellerModule, UserModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductPostgresRepository,
    { provide: PRODUCT_REPOSITORY, useClass: ProductPostgresRepository },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
