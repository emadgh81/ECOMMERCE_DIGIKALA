import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductVariantService } from './product_variant.service';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Post('/product/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  create(
    @Param('productId') productId: string,
    @Body() createProductVariantDto: CreateProductVariantDto,
  ) {
    return this.productVariantService.create(
      productId,
      createProductVariantDto,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productVariantService.findById(id);
  }

  @Get('/product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.productVariantService.findByProduct(productId);
  }

  @Get('sku/:sku')
  findBySku(@Param('sku') sku: string) {
    return this.productVariantService.findBySku(sku);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  update(
    @Param('id') id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantService.update(id, updateProductVariantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(id);
  }
}
