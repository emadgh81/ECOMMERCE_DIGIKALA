import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderPostgresRepository } from './repository/order.repository';
import { ORDER_REPOSITORY } from 'src/common/interfaces/Orders/order.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderPostgresRepository,
    { provide: ORDER_REPOSITORY, useClass: OrderPostgresRepository },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderModule {}
