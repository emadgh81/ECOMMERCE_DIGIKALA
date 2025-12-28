import { Module } from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { ProductVariantController } from './product_variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './entities/product_variant.entity';
import { ProductVariantPostgresRepository } from './repository/product_variant.repository';
import { PRODUCT_VARIANT_REPOSITORY } from 'src/common/interfaces/Products/product_variant.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant])],
  controllers: [ProductVariantController],
  providers: [
    ProductVariantService,
    ProductVariantPostgresRepository,
    {
      provide: PRODUCT_VARIANT_REPOSITORY,
      useClass: ProductVariantPostgresRepository,
    },
  ],
  exports: [PRODUCT_VARIANT_REPOSITORY],
})
export class ProductVariantModule {}
