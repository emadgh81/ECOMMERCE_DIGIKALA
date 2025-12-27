import { Module } from '@nestjs/common';
import { ProductAttributeOptionService } from './product_attribute_option.service';
import { ProductAttributeOptionController } from './product_attribute_option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeOption } from './entities/product_attribute_option.entity';
import { ProductAttributeOptionPostgresRepository } from './repository/product_attribute_option.repository';
import { PRODUCT_ATTRIBUTE_OPTION } from 'src/common/interfaces/Products/product_attribute_option.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeOption])],
  controllers: [ProductAttributeOptionController],
  providers: [
    ProductAttributeOptionService,
    ProductAttributeOptionPostgresRepository,
    {
      provide: PRODUCT_ATTRIBUTE_OPTION,
      useClass: ProductAttributeOptionPostgresRepository,
    },
  ],
  exports: [PRODUCT_ATTRIBUTE_OPTION],
})
export class ProductAttributeOptionModule {}
