import { IsOptional, IsString } from 'class-validator';

export class CreateProductAttributeValueDto {
  @IsString()
  product_id!: string;

  @IsString()
  product_attribute_id!: string;

  @IsString()
  product_attribute_option_id!: string;

  @IsString()
  @IsOptional()
  value?: string;
}
