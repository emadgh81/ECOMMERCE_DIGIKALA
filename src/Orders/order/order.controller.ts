import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEnum } from 'src/common/enum/order.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';
import { AuthRequest } from 'src/common/interfaces/request.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.CUSTOMER)
  create(@Req() req: AuthRequest) {
    return this.orderService.create(req.user.id);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.orderService.findByUser(userId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: OrderEnum) {
    return this.orderService.findByStatus(status);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: AuthRequest,
  ) {
    return this.orderService.update(id, updateOrderDto, {
      id: req.user.id,
      role: req.user.role as RoleEnum,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
