import { IsUUID } from 'class-validator';

export class CreateProductVariantAttributeDto {
  @IsUUID()
  product_variant_id!: string;

  @IsUUID()
  product_attribute_id!: string;

  @IsUUID()
  product_attribute_option_id!: string;
}
