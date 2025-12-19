import { PartialType } from '@nestjs/mapped-types';
import { CreateReviweDto } from './create-reviwe.dto';

export class UpdateReviweDto extends PartialType(CreateReviweDto) {}
