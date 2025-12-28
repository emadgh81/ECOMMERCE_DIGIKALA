import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  stock!: number;
}
