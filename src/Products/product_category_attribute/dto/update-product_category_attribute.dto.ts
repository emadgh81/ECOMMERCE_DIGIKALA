import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryAttributeDto } from './create-product_category_attribute.dto';

export class UpdateProductCategoryAttributeDto extends PartialType(
  CreateProductCategoryAttributeDto,
) {}
