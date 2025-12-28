import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductCategoryAttributeDto {
  @IsUUID()
  product_category_id!: string;

  @IsUUID()
  product_attribute_id!: string;

  @IsBoolean()
  @IsNotEmpty()
  is_required!: boolean;
}
