import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/common/interfaces/Users/user.repository.interface';
import { JwtPayload } from 'src/common/interfaces/jwtpayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const exists = await this.userRepo.findByEmail(registerDto.email);
    if (exists) throw new ConflictException(`email already exists`);

    const hashed = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userRepo.createAndSave({
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      email: registerDto.email,
      password: hashed,
      phone: registerDto.phone,
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException(`invalid credentials`);

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException(`invalid credentials`);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
