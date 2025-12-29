import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from 'src/common/interfaces/Carts/cart.repository.interface';
import { Cart } from '../entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartPostgresRepository implements CartRepository {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
  ) {}

  findAll() {
    return this.cartRepo.find();
  }

  findById(id: string) {
    return this.cartRepo.findOne({ where: { id } });
  }

  findByUser(userId: string) {
    return this.cartRepo.find({ where: { user_id: userId } });
  }

  createAndSave(cart: Partial<Cart>) {
    const ent = this.cartRepo.create(cart);
    return this.cartRepo.save(ent);
  }

  save(cart: Cart) {
    return this.cartRepo.save(cart);
  }

  async remove(cart: Cart) {
    await this.cartRepo.remove(cart);
  }
}
