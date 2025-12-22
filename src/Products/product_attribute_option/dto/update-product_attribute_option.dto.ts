import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAttributeOptionDto } from './create-product_attribute_option.dto';

export class UpdateProductAttributeOptionDto extends PartialType(
  CreateProductAttributeOptionDto,
) {}
