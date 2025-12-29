import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { CartEnum } from 'src/common/enum/cart.enum';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsOptional()
  @IsEnum(CartEnum)
  status?: CartEnum;
}
