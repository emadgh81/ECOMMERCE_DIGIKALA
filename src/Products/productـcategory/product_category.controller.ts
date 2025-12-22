import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';

@Controller('category')
export class ProductCategoryController {
  constructor(
    private readonly productcategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productcategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productcategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productcategoryService.remove(+id);
  }
}
