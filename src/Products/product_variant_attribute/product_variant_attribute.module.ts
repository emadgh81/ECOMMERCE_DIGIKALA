import { Module } from '@nestjs/common';
import { ProductVariantAttributeService } from './product_variant_attribute.service';
import { ProductVariantAttributeController } from './product_variant_attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantAttribute } from './entities/product_variant_attribute.entity';
import { ProductVariantAttributePostgresRepository } from './repository/product_variant_attribute.repository';
import { PRODUCT_VARIANT_ATTRIBUTE_REPOSITORY } from 'src/common/interfaces/Products/product_variant_attribute.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantAttribute])],
  controllers: [ProductVariantAttributeController],
  providers: [
    ProductVariantAttributeService,
    ProductVariantAttributePostgresRepository,
    {
      provide: PRODUCT_VARIANT_ATTRIBUTE_REPOSITORY,
      useClass: ProductVariantAttributePostgresRepository,
    },
  ],
  exports: [PRODUCT_VARIANT_ATTRIBUTE_REPOSITORY],
})
export class ProductVariantAttributeModule {}
