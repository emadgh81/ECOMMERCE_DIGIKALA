import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRate } from 'src/common/enum/review.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';
import { AuthRequest } from 'src/common/interfaces/request.interface';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.CUSTOMER)
  create(@Req() req: AuthRequest, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(req.user.id, createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProduct(productId);
  }

  @Get('rating/:rating')
  findByRating(@Param('rating') rating: ReviewRate) {
    return this.reviewService.findByRating(rating);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.reviewService.findByUser(userId);
  }

  @Get('user/:userId/product/:productId')
  findByUserAndProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.reviewService.findByUserAndProduct(userId, productId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.CUSTOMER)
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(req.user.id, id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
