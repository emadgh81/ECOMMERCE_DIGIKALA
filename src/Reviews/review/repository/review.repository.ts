import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from 'src/common/interfaces/Reviews/review.repository.interface';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewRate } from 'src/common/enum/review.enum';

@Injectable()
export class ReviewPostgresRepository implements ReviewRepository {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
  ) {}
  findAll() {
    return this.reviewRepo.find();
  }

  findById(id: string) {
    return this.reviewRepo.findOne({ where: { id } });
  }

  findByProduct(productId: string) {
    return this.reviewRepo.find({ where: { product_id: productId } });
  }

  findByRating(rating: ReviewRate) {
    return this.reviewRepo.find({ where: { rating: rating } });
  }

  findByUser(userId: string) {
    return this.reviewRepo.find({ where: { user_id: userId } });
  }

  findByUserAndProduct(userId: string, productId: string) {
    return this.reviewRepo.findOne({
      where: { user_id: userId, product_id: productId },
    });
  }

  createAndSave(review: Partial<Review>) {
    const ent = this.reviewRepo.create(review);
    return this.reviewRepo.save(ent);
  }
  save(review: Review) {
    return this.reviewRepo.save(review);
  }
  async remove(review: Review) {
    await this.reviewRepo.remove(review);
  }
}
