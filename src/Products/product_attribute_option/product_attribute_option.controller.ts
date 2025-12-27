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
import { ProductAttributeOptionService } from './product_attribute_option.service';
import { CreateProductAttributeOptionDto } from './dto/create-product_attribute_option.dto';
import { UpdateProductAttributeOptionDto } from './dto/update-product_attribute_option.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';

@Controller('attribute-option')
export class ProductAttributeOptionController {
  constructor(
    private readonly productattributeOptionService: ProductAttributeOptionService,
  ) {}

  @Post('product-attributes/:attributeId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  create(
    @Param('attributeId') attributeId: string,
    @Body() createProductAttributeOptionDto: CreateProductAttributeOptionDto,
  ) {
    return this.productattributeOptionService.create(
      attributeId,
      createProductAttributeOptionDto,
    );
  }

  @Get()
  findAll() {
    return this.productattributeOptionService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productattributeOptionService.findById(id);
  }

  @Get('by-attribute/:attributeId')
  findByAttribute(@Param('attributeId') attributeId: string) {
    return this.productattributeOptionService.findById(attributeId);
  }

  @Get('by-code/:code')
  findByCode(@Param('code') code: string) {
    return this.productattributeOptionService.findById(code);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  update(
    @Param('id') id: string,
    @Body() updateProductAttributeOptionDto: UpdateProductAttributeOptionDto,
  ) {
    return this.productattributeOptionService.update(
      id,
      updateProductAttributeOptionDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  remove(@Param('id') id: string) {
    return this.productattributeOptionService.remove(id);
  }
}
