import { IsString } from 'class-validator';

export class CreateProductVariantAttributeDto {
  @IsString()
  product_variant_id!: string;

  @IsString()
  product_attribute_id!: string;

  @IsString()
  product_attribute_option_id!: string;
}
