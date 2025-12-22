import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCategoryAttributeService } from './product_category_attribute.service';
import { CreateProductCategoryAttributeDto } from './dto/create-product_category_attribute.dto';
import { UpdateProductCategoryAttributeDto } from './dto/update-product_category_attribute.dto';

@Controller('category-attribute')
export class ProductCategoryAttributeController {
  constructor(
    private readonly productcategoryAttributeService: ProductCategoryAttributeService,
  ) {}

  @Post()
  create(
    @Body()
    createProductCategoryAttributeDto: CreateProductCategoryAttributeDto,
  ) {
    return this.productcategoryAttributeService.create(
      createProductCategoryAttributeDto,
    );
  }

  @Get()
  findAll() {
    return this.productcategoryAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productcategoryAttributeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateProductCategoryAttributeDto: UpdateProductCategoryAttributeDto,
  ) {
    return this.productcategoryAttributeService.update(
      +id,
      updateProductCategoryAttributeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productcategoryAttributeService.remove(+id);
  }
}
