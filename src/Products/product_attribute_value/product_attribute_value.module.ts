import { Module } from '@nestjs/common';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { ProductAttributeValueController } from './product_attribute_value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeValue } from './entities/product_attribute_value.entity';
import { ProductAttributeValuePostgresRepository } from './repository/product_attribute_value.repository';
import { PRODUCT_ATTRIBUTE_VALUE } from 'src/common/interfaces/Products/product_attribute_value.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeValue])],
  controllers: [ProductAttributeValueController],
  providers: [
    ProductAttributeValueService,
    ProductAttributeValuePostgresRepository,
    {
      provide: PRODUCT_ATTRIBUTE_VALUE,
      useClass: ProductAttributeValuePostgresRepository,
    },
  ],
  exports: [PRODUCT_ATTRIBUTE_VALUE],
})
export class ProductAttributeValueModule {}
