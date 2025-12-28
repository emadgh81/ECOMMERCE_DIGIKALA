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
import { ProductAttributeValueService } from './product_attribute_value.service';
import { CreateProductAttributeValueDto } from './dto/create-product_attribute_value.dto';
import { UpdateProductAttributeValueDto } from './dto/update-product_attribute_value.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';

@Controller('product-attribute-value')
export class ProductAttributeValueController {
  constructor(
    private readonly productAttributeValueService: ProductAttributeValueService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  create(
    @Body() createProductAttributeValueDto: CreateProductAttributeValueDto,
  ) {
    return this.productAttributeValueService.create(
      createProductAttributeValueDto,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productAttributeValueService.findById(id);
  }

  @Get('/product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.productAttributeValueService.findByProduct(productId);
  }

  @Get('/product/:productId/attribute/:attributeId')
  findByProductAndAttribute(
    @Param('productId') productId: string,
    @Param('attributeId') attributeId: string,
  ) {
    return this.productAttributeValueService.findByProductAndAttribute(
      productId,
      attributeId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  update(
    @Param('id') id: string,
    @Body() updateProductAttributeValueDto: UpdateProductAttributeValueDto,
  ) {
    return this.productAttributeValueService.update(
      id,
      updateProductAttributeValueDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  remove(@Param('id') id: string) {
    return this.productAttributeValueService.remove(id);
  }
}
