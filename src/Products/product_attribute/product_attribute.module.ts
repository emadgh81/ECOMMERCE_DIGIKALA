import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { ProductAttributeController } from './product_attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product_attribute.entity';
import { ProductAttributePostgresRepository } from './repository/product_attribute.repository';
import { PRODUCT_ATTRIBUTE } from 'src/common/interfaces/Products/product_attribute.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttribute])],
  controllers: [ProductAttributeController],
  providers: [
    ProductAttributeService,
    ProductAttributePostgresRepository,
    {
      provide: PRODUCT_ATTRIBUTE,
      useClass: ProductAttributePostgresRepository,
    },
  ],
  exports: [PRODUCT_ATTRIBUTE],
})
export class ProductAttributeModule {}
