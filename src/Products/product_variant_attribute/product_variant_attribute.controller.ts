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
import { ProductVariantAttributeService } from './product_variant_attribute.service';
import { CreateProductVariantAttributeDto } from './dto/create-product_variant_attribute.dto';
import { UpdateProductVariantAttributeDto } from './dto/update-product_variant_attribute.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';

@Controller('variant-attribute')
export class ProductVariantAttributeController {
  constructor(
    private readonly productvariantAttributeService: ProductVariantAttributeService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  create(
    @Body() createProductVariantAttributeDto: CreateProductVariantAttributeDto,
  ) {
    return this.productvariantAttributeService.create(
      createProductVariantAttributeDto,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productvariantAttributeService.findById(id);
  }

  @Get('/variant/:variantId')
  findVariant(@Param('variantId') variantId: string) {
    return this.productvariantAttributeService.findByVariant(variantId);
  }

  @Get('/variant/:variantId/attribute/:attributeId')
  findByVariantAndAttribute(
    @Param('variantId') variantId: string,
    @Param('attributeId') attributeId: string,
  ) {
    return this.productvariantAttributeService.findByVariantAndAttribute(
      variantId,
      attributeId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  update(
    @Param('id') id: string,
    @Body() updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    return this.productvariantAttributeService.update(
      id,
      updateProductVariantAttributeDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  remove(@Param('id') id: string) {
    return this.productvariantAttributeService.remove(id);
  }
}
