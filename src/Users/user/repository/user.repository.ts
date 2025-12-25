import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/common/interfaces/user_repository.interface';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPostgresRepository implements UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  createAndSave(user: Partial<User>) {
    const ent = this.userRepo.create(user);
    return this.userRepo.save(ent);
  }

  save(user: User) {
    return this.userRepo.save(user);
  }

  async remove(user: User) {
    await this.userRepo.remove(user);
  }
}
