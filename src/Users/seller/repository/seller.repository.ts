import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerRepository } from 'src/common/interfaces/Users/seller.repository.interface';
import { Seller } from '../entities/seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerPostgresRepository implements SellerRepository {
  constructor(
    @InjectRepository(Seller) private readonly sellerRepo: Repository<Seller>,
  ) {}

  findAll() {
    return this.sellerRepo.find();
  }

  findById(id: string) {
    return this.sellerRepo.findOne({ where: { id } });
  }

  findByUserId(userId: string) {
    return this.sellerRepo.findOne({ where: { user_id: userId } });
  }

  createAndSave(seller: Partial<Seller>) {
    const ent = this.sellerRepo.create(seller);
    return this.sellerRepo.save(ent);
  }

  save(seller: Seller) {
    return this.sellerRepo.save(seller);
  }

  async remove(seller: Seller) {
    await this.sellerRepo.remove(seller);
  }
}
