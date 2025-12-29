import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  cart_id!: string;

  @IsUUID()
  product_variant_id!: string;

  @IsInt()
  @IsPositive()
  quantity!: number;
}
