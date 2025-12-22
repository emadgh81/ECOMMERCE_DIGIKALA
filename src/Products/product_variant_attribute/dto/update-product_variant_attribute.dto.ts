import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantAttributeDto } from './create-product_variant_attribute.dto';

export class UpdateProductVariantAttributeDto extends PartialType(
  CreateProductVariantAttributeDto,
) {}
