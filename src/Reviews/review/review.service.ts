import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  REVIEW_REPOSITORY,
  ReviewRepository,
} from 'src/common/interfaces/Reviews/review.repository.interface';
import { ReviewRate } from 'src/common/enum/review.enum';
import { plainToInstance } from 'class-transformer';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly reviewRepo: ReviewRepository,
  ) {}
  async create(userId: string, createReviewDto: CreateReviewDto) {
    const exists = await this.reviewRepo.findByUserAndProduct(
      userId,
      createReviewDto.product_id,
    );

    if (exists) {
      throw new BadRequestException(`you have already reviewed this product`);
    }

    const review = await this.reviewRepo.createAndSave({
      user_id: userId,
      product_id: createReviewDto.product_id,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    });

    return plainToInstance(Review, review);
  }

  async findAll() {
    const review = await this.reviewRepo.findAll();
    return review.map((r) => plainToInstance(Review, r));
  }

  async findById(id: string) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('review not found');
    return plainToInstance(Review, review);
  }

  async findByProduct(productId: string) {
    const review = await this.reviewRepo.findByProduct(productId);
    return review.map((r) => plainToInstance(Review, r));
  }

  async findByRating(rating: ReviewRate) {
    const review = await this.reviewRepo.findByRating(rating);
    return review.map((r) => plainToInstance(Review, r));
  }

  async findByUser(userId: string) {
    const review = await this.reviewRepo.findByUser(userId);
    return review.map((r) => plainToInstance(Review, r));
  }

  async findByUserAndProduct(userId: string, productId: string) {
    const review = await this.reviewRepo.findByUserAndProduct(
      userId,
      productId,
    );
    if (!review) throw new NotFoundException('review not found');
    return plainToInstance(Review, review);
  }

  async update(userId: string, id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('review not found');

    if (review.user_id !== userId) {
      throw new ForbiddenException('You can only edit your own review');
    }

    if (updateReviewDto.comment !== undefined)
      review.comment = updateReviewDto.comment;
    if (updateReviewDto.rating !== undefined)
      review.rating = updateReviewDto.rating;

    const saved = await this.reviewRepo.save(review);
    return plainToInstance(Review, saved);
  }

  async remove(id: string) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('review not found');
    await this.reviewRepo.remove(review);
    return { deleted: true };
  }
}
