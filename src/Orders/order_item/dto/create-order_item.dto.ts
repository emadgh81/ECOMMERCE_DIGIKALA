import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  product_variant_id!: string;

  @IsInt()
  @IsPositive()
  quantity!: number;
}
