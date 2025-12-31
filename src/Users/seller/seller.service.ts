import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSellerDto } from './dto/update-seller.dto';
import {
  SELLER_REPOSITORY,
  SellerRepository,
} from 'src/common/interfaces/Users/seller.repository.interface';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/common/interfaces/Users/user.repository.interface';
import { CreateSellerDto } from './dto/create-seller.dto';
import { RoleEnum } from 'src/common/enum/role.enum';
import { plainToInstance } from 'class-transformer';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @Inject(SELLER_REPOSITORY)
    private readonly sellerRepo: SellerRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async create(userId: string, createSellerDto: CreateSellerDto) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundException(`user not found`);

    const exists = await this.sellerRepo.findByUserId(userId);
    if (exists) throw new BadRequestException(`user already have store`);

    const seller = await this.sellerRepo.createAndSave({
      user_id: user.id,
      user: user,
      store_name: createSellerDto.store_name,
    });

    user.role = RoleEnum.SELLER;
    await this.userRepo.save(user);

    return plainToInstance(Seller, seller);
  }

  async findAll() {
    const seller = await this.sellerRepo.findAll();
    return seller.map((s) => plainToInstance(Seller, s));
  }

  async findById(id: string) {
    const seller = await this.sellerRepo.findById(id);
    if (!seller) throw new NotFoundException(`seller not found`);

    return plainToInstance(Seller, seller);
  }

  async findByUserId(userId: string) {
    const seller = await this.sellerRepo.findByUserId(userId);
    if (!seller) throw new NotFoundException(`seller not found`);

    return plainToInstance(Seller, seller);
  }

  async update(id: string, userId: string, updateSellerDto: UpdateSellerDto) {
    const seller = await this.sellerRepo.findById(id);
    if (!seller) throw new NotFoundException(`seller not found`);
    if (seller.user_id !== userId)
      throw new ForbiddenException(`access denied`);
    if (updateSellerDto.store_name)
      seller.store_name = updateSellerDto.store_name;

    const saved = await this.sellerRepo.save(seller);
    return plainToInstance(Seller, saved);
  }

  async remove(id: string, userId: string) {
    const seller = await this.sellerRepo.findById(id);
    if (!seller) throw new NotFoundException(`seller not found`);
    if (seller.user_id !== userId)
      throw new ForbiddenException(`access denied`);

    await this.sellerRepo.remove(seller);
    return { deleted: true };
  }
}
