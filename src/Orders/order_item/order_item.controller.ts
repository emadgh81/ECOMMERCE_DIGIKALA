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
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post('order/:orderId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  create(
    @Param('orderId') orderId: string,
    @Body() createOrderItemDto: CreateOrderItemDto,
  ) {
    return this.orderItemService.create(orderId, createOrderItemDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderItemService.findById(id);
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.orderItemService.findByOrder(orderId);
  }

  @Get('order/:orderId/variant/:productVariantId')
  findByOrderAndVariant(
    @Param('orderId') orderId: string,
    @Param('productVariantId') productVariantId: string,
  ) {
    return this.orderItemService.findByOrderAndVariant(
      orderId,
      productVariantId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
