import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/common/interfaces/Orders/order.repository.interface';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { OrderEnum } from 'src/common/enum/order.enum';

@Injectable()
export class OrderPostgresRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  findById(id: string) {
    return this.orderRepo.findOne({ where: { id } });
  }

  findByUser(userId: string) {
    return this.orderRepo.find({ where: { user_id: userId } });
  }

  findByStatus(status: OrderEnum) {
    return this.orderRepo.find({ where: { status: status } });
  }

  createAndSave(order: Partial<Order>) {
    const ent = this.orderRepo.create(order);
    return this.orderRepo.save(ent);
  }

  save(order: Order) {
    return this.orderRepo.save(order);
  }

  async remove(order: Order) {
    await this.orderRepo.remove(order);
  }
}
