import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductAttributeValueDto {
  @IsUUID()
  product_id!: string;

  @IsUUID()
  product_attribute_id!: string;

  @IsUUID()
  @IsOptional()
  product_attribute_option_id?: string;

  @IsString()
  @IsOptional()
  value?: string;
}
