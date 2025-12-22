import { Module } from '@nestjs/common';
import { ProductVariantAttributeService } from './product_variant_attribute.service';
import { ProductVariantAttributeController } from './product_variant_attribute.controller';

@Module({
  controllers: [ProductVariantAttributeController],
  providers: [ProductVariantAttributeService],
})
export class ProductVariantAttributeModule {}
