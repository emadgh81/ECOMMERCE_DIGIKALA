import { Module } from '@nestjs/common';
import { ProductAttributeOptionService } from './product_attribute_option.service';
import { ProductAttributeOptionController } from './product_attribute_option.controller';

@Module({
  controllers: [ProductAttributeOptionController],
  providers: [ProductAttributeOptionService],
})
export class ProductAttributeOptionModule {}
