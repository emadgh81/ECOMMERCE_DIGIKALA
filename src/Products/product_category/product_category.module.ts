import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product_category.entity';
import { ProductCategoryPostgresRepository } from './repository/product_category.repository';
import { PRODUCT_CATEGORY } from 'src/common/interfaces/Products/product_category.repository.interface';
import { SellerModule } from 'src/Users/seller/seller.module';
import { UserModule } from 'src/Users/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory]),
    SellerModule,
    UserModule,
  ],
  controllers: [ProductCategoryController],
  providers: [
    ProductCategoryService,
    ProductCategoryPostgresRepository,
    { provide: PRODUCT_CATEGORY, useClass: ProductCategoryPostgresRepository },
  ],
  exports: [PRODUCT_CATEGORY],
})
export class ProductCategoryModule {}
