import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductAttributeOptionDto {
  @IsString()
  @IsNotEmpty()
  product_attribute_id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  color!: string;

  @IsString()
  @IsOptional()
  image?: string;
}
