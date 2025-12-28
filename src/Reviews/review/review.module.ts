import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewPostgresRepository } from './repository/review.repository';
import { REVIEW_REPOSITORY } from 'src/common/interfaces/Reviews/review.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewPostgresRepository,
    { provide: REVIEW_REPOSITORY, useClass: ReviewPostgresRepository },
  ],
  exports: [REVIEW_REPOSITORY],
})
export class ReviewModule {}
