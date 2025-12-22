import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductAttributeOptionService } from './product_attribute_option.service';
import { CreateProductAttributeOptionDto } from './dto/create-product_attribute_option.dto';
import { UpdateProductAttributeOptionDto } from './dto/update-product_attribute_option.dto';

@Controller('attribute-option')
export class ProductAttributeOptionController {
  constructor(
    private readonly productattributeOptionService: ProductAttributeOptionService,
  ) {}

  @Post()
  create(
    @Body() createProductAttributeOptionDto: CreateProductAttributeOptionDto,
  ) {
    return this.productattributeOptionService.create(
      createProductAttributeOptionDto,
    );
  }

  @Get()
  findAll() {
    return this.productattributeOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productattributeOptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductAttributeOptionDto: UpdateProductAttributeOptionDto,
  ) {
    return this.productattributeOptionService.update(
      +id,
      updateProductAttributeOptionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productattributeOptionService.remove(+id);
  }
}
