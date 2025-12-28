import { ReviewRate } from 'src/common/enum/review.enum';
import { Review } from 'src/Reviews/review/entities/review.entity';

export const REVIEW_REPOSITORY = 'IReviewRepository';
export interface ReviewRepository {
  findAll(): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  findByProduct(productId: string): Promise<Review[]>;
  findByUser(userId: string): Promise<Review[]>;
  findByRating(rating: ReviewRate): Promise<Review[]>;
  findByUserAndProduct(
    userId: string,
    productId: string,
  ): Promise<Review | null>;
  createAndSave(review: Partial<Review>): Promise<Review>;
  save(review: Review): Promise<Review>;
  remove(review: Review): Promise<void>;
}
