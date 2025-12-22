import { Module } from '@nestjs/common';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { ProductAttributeValueController } from './product_attribute_value.controller';

@Module({
  controllers: [ProductAttributeValueController],
  providers: [ProductAttributeValueService],
})
export class ProductAttributeValueModule {}
