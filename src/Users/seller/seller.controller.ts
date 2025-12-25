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
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enum/role.enum';
import { JwtPayload } from 'src/common/interfaces/jwtpayload.interface';

@Controller('seller')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(
    @Body() createSellerDto: CreateSellerDto,
    @Req() req: { user: JwtPayload },
  ) {
    return this.sellerService.create(req.user.userId, createSellerDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.sellerService.findById(id);
  }

  @Get('my/stores')
  findByUserId(@Req() req: { user: JwtPayload }) {
    return this.sellerService.findByUserId(req.user.userId);
  }

  @Patch(':id')
  @Roles(RoleEnum.SELLER)
  update(
    @Param('id') id: string,
    @Req() req: { user: JwtPayload },
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellerService.update(id, req.user.userId, updateSellerDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.SELLER)
  remove(@Param('id') id: string, @Req() req: { user: JwtPayload }) {
    return this.sellerService.remove(id, req.user.userId);
  }
}
