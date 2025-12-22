import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductVariantAttributeService } from './product_variant_attribute.service';
import { CreateProductVariantAttributeDto } from './dto/create-product_variant_attribute.dto';
import { UpdateProductVariantAttributeDto } from './dto/update-product_variant_attribute.dto';

@Controller('variant-attribute')
export class ProductVariantAttributeController {
  constructor(
    private readonly productvariantAttributeService: ProductVariantAttributeService,
  ) {}

  @Post()
  create(
    @Body() createProductVariantAttributeDto: CreateProductVariantAttributeDto,
  ) {
    return this.productvariantAttributeService.create(
      createProductVariantAttributeDto,
    );
  }

  @Get()
  findAll() {
    return this.productvariantAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productvariantAttributeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantAttributeDto: UpdateProductVariantAttributeDto,
  ) {
    return this.productvariantAttributeService.update(
      +id,
      updateProductVariantAttributeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productvariantAttributeService.remove(+id);
  }
}
