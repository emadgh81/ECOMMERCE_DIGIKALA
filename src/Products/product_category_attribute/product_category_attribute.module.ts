import { Module } from '@nestjs/common';
import { ProductCategoryAttributeService } from './product_category_attribute.service';
import { ProductCategoryAttributeController } from './product_category_attribute.controller';

@Module({
  controllers: [ProductCategoryAttributeController],
  providers: [ProductCategoryAttributeService],
})
export class ProductCategoryAttributeModule {}
