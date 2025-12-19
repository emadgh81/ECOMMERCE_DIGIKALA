import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductAttributeValueService } from './product_attribute_value.service';
import { CreateProductAttributeValueDto } from './dto/create-product_attribute_value.dto';
import { UpdateProductAttributeValueDto } from './dto/update-product_attribute_value.dto';

@Controller('product-attribute-value')
export class ProductAttributeValueController {
  constructor(private readonly productAttributeValueService: ProductAttributeValueService) {}

  @Post()
  create(@Body() createProductAttributeValueDto: CreateProductAttributeValueDto) {
    return this.productAttributeValueService.create(createProductAttributeValueDto);
  }

  @Get()
  findAll() {
    return this.productAttributeValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productAttributeValueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductAttributeValueDto: UpdateProductAttributeValueDto) {
    return this.productAttributeValueService.update(+id, updateProductAttributeValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAttributeValueService.remove(+id);
  }
}
