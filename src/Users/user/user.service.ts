import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/common/interfaces/user_repository.interface';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const exists = await this.userRepo.findByEmail(createUserDto.email);
    if (exists) throw new ConflictException(`Email already exists`);

    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepo.createAndSave({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: hashed,
      phone: createUserDto.phone,
    });
    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.userRepo.findAll();
    return users.map((u) => plainToInstance(User, u));
  }

  async findById(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException(`User not found`);
    return plainToInstance(User, user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException(`User not found`);
    return plainToInstance(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException(`User not found`);

    if (updateUserDto.password)
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.first_name) user.first_name = updateUserDto.first_name;
    if (updateUserDto.last_name) user.last_name = updateUserDto.last_name;
    if (updateUserDto.phone) user.phone = updateUserDto.phone;

    const saved = await this.userRepo.save(user);
    return plainToInstance(User, saved);
  }

  async remove(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException(`User not found`);

    await this.userRepo.remove(user);
    return { deleted: true };
  }
}
