import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';
import { AuthRequest } from 'src/common/interfaces/request.interface';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.CUSTOMER)
  create(
    @Req() req: AuthRequest,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartItemService.create(req.user.id, createCartItemDto);
  }

  @Get('cart/:cartId/product/:productVariantId')
  findByCartAndProductVariant(
    @Param('cartId') cartid: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    return this.cartItemService.findByCartAndProductVariant(
      cartid,
      productVariantId,
    );
  }

  @Get('cart/:cartId')
  findByCart(@Param('cartId') cartId: string) {
    return this.cartItemService.findByCart(cartId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.cartItemService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.CUSTOMER)
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.CUSTOMER)
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(id);
  }
}
