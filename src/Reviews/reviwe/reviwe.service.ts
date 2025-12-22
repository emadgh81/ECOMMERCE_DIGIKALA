import { Injectable } from '@nestjs/common';
import { CreateReviweDto } from './dto/create-reviwe.dto';
import { UpdateReviweDto } from './dto/update-reviwe.dto';

@Injectable()
export class ReviweService {
  create(createReviweDto: CreateReviweDto) {
    return 'This action adds a new reviwe';
  }

  findAll() {
    return `This action returns all reviwe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviwe`;
  }

  update(id: number, updateReviweDto: UpdateReviweDto) {
    return `This action updates a #${id} reviwe`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviwe`;
  }
}
