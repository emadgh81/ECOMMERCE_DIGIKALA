import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  store_name!: string;
}
