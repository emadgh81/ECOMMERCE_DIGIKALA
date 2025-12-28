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
import { ProductCategoryAttributeService } from './product_category_attribute.service';
import { CreateProductCategoryAttributeDto } from './dto/create-product_category_attribute.dto';
import { UpdateProductCategoryAttributeDto } from './dto/update-product_category_attribute.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';

@Controller('category-attribute')
export class ProductCategoryAttributeController {
  constructor(
    private readonly productcategoryAttributeService: ProductCategoryAttributeService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  create(
    @Body()
    createProductCategoryAttributeDto: CreateProductCategoryAttributeDto,
  ) {
    return this.productcategoryAttributeService.create(
      createProductCategoryAttributeDto,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productcategoryAttributeService.findById(id);
  }

  @Get('/category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.productcategoryAttributeService.findByCategory(categoryId);
  }

  @Get('/category/:categoryId/attribute/:attributeId')
  findByCategoryAndAttribute(
    @Param('categoryId') categoryId: string,
    @Param('attributeId') attributeId: string,
  ) {
    return this.productcategoryAttributeService.findByCategoryAndAttribute(
      categoryId,
      attributeId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  update(
    @Param('id') id: string,
    @Body()
    updateProductCategoryAttributeDto: UpdateProductCategoryAttributeDto,
  ) {
    return this.productcategoryAttributeService.update(
      id,
      updateProductCategoryAttributeDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SELLER)
  remove(@Param('id') id: string) {
    return this.productcategoryAttributeService.remove(id);
  }
}
