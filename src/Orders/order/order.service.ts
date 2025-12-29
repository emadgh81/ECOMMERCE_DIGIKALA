import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/common/interfaces/Orders/order.repository.interface';
import { plainToInstance } from 'class-transformer';
import { Order } from './entities/order.entity';
import { OrderEnum } from 'src/common/enum/order.enum';
import { RoleEnum } from 'src/common/enum/role.enum';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {}
  async create(userId: string) {
    const order = await this.orderRepo.createAndSave({
      user_id: userId,
      status: OrderEnum.PENDING,
      total_price: 0,
    });
    return plainToInstance(Order, order);
  }

  async findAll() {
    const order = await this.orderRepo.findAll();
    return order.map((o) => plainToInstance(Order, o));
  }

  async findById(id: string) {
    const order = await this.orderRepo.findById(id);
    if (!order) throw new NotFoundException('order not found');
    return plainToInstance(Order, order);
  }

  async findByUser(userId: string) {
    const order = await this.orderRepo.findByUser(userId);
    return order.map((o) => plainToInstance(Order, o));
  }

  async findByStatus(status: OrderEnum) {
    const order = await this.orderRepo.findByStatus(status);
    return order.map((o) => plainToInstance(Order, o));
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
    user: { id: string; role: RoleEnum },
  ) {
    const order = await this.orderRepo.findById(id);
    if (!order) throw new NotFoundException('order not found');

    if (updateOrderDto.status) {
      if (user.role !== RoleEnum.ADMIN) {
        throw new ForbiddenException('only admin can change order status');
      }
      order.status = updateOrderDto.status;
    }

    const saved = await this.orderRepo.save(order);
    return plainToInstance(Order, saved);
  }

  async remove(id: string) {
    const order = await this.orderRepo.findById(id);
    if (!order) throw new NotFoundException('order not found');
    await this.orderRepo.remove(order);
    return { deleted: true };
  }
}
