import { Module } from '@nestjs/common';
import { ProductCategoryAttributeService } from './product_category_attribute.service';
import { ProductCategoryAttributeController } from './product_category_attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryAttribute } from './entities/product_category_attribute.entity';
import { ProductCategoryAttributePostgresRepository } from './repository/product_category_attribute.repository';
import { PRODUCT_CATEGORY_ATTRIBUTE } from 'src/common/interfaces/Products/product_category_attribute.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryAttribute])],
  controllers: [ProductCategoryAttributeController],
  providers: [
    ProductCategoryAttributeService,
    ProductCategoryAttributePostgresRepository,
    {
      provide: PRODUCT_CATEGORY_ATTRIBUTE,
      useClass: ProductCategoryAttributePostgresRepository,
    },
  ],
  exports: [PRODUCT_CATEGORY_ATTRIBUTE],
})
export class ProductCategoryAttributeModule {}
