import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  CART_REPOSITORY,
  CartRepository,
} from 'src/common/interfaces/Carts/cart.repository.interface';
import { plainToInstance } from 'class-transformer';
import { Cart } from './entities/cart.entity';
import { CartEnum } from 'src/common/enum/cart.enum';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) {}
  async create(userId: string) {
    const activeCart = await this.cartRepo.findByUser(userId);

    if (activeCart) throw new BadRequestException(`user already has a cart`);

    const cart = await this.cartRepo.createAndSave({
      user_id: userId,
      status: CartEnum.ACTIVE,
    });

    return plainToInstance(Cart, cart);
  }

  async findAll() {
    const cart = await this.cartRepo.findAll();
    return cart.map((c) => plainToInstance(Cart, c));
  }

  async findById(id: string) {
    const cart = await this.cartRepo.findById(id);
    if (!cart) throw new NotFoundException('cart not found');
    return plainToInstance(Cart, cart);
  }

  async findByUser(userId: string) {
    const cart = await this.cartRepo.findByUser(userId);
    return cart.map((c) => plainToInstance(Cart, c));
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepo.findById(id);
    if (!cart) throw new NotFoundException('cart not found');
    if (updateCartDto.status !== undefined) cart.status = updateCartDto.status;
    const saved = await this.cartRepo.save(cart);
    return plainToInstance(Cart, saved);
  }

  async remove(id: string) {
    const cart = await this.cartRepo.findById(id);
    if (!cart) throw new NotFoundException('cart not found');
    await this.cartRepo.remove(cart);
    return { deleted: true };
  }
}
