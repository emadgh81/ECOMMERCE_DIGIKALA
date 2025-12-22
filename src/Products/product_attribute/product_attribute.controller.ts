import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductAttributeService } from './product_attribute.service';
import { CreateProductAttributeDto } from './dto/create-product_attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product_attribute.dto';

@Controller('attribute')
export class ProductAttributeController {
  constructor(
    private readonly productattributeService: ProductAttributeService,
  ) {}

  @Post()
  create(@Body() createProductAttributeDto: CreateProductAttributeDto) {
    return this.productattributeService.create(createProductAttributeDto);
  }

  @Get()
  findAll() {
    return this.productattributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productattributeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductAttributeDto: UpdateProductAttributeDto,
  ) {
    return this.productattributeService.update(+id, updateProductAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productattributeService.remove(+id);
  }
}
