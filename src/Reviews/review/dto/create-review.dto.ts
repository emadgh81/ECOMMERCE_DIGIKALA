import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { REVIEW_RATE, ReviewRate } from 'src/common/enum/review.enum';

export class CreateReviewDto {
  @IsUUID()
  product_id!: string;

  @IsOptional()
  @IsEnum(REVIEW_RATE)
  rating?: ReviewRate;

  @IsOptional()
  @IsString()
  comment?: string;
}
