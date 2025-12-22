import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttributeController } from './product_attribute.controller';

@Module({
  controllers: [ProductAttributeController],
  providers: [ProductAttributeService],
})
export class ProductAttributeModule {}
