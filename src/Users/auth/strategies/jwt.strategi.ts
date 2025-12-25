import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common/interfaces/jwtpayload.interface';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/common/interfaces/Users/user.repository.interface';
import { User } from 'src/Users/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepo.findById(payload.userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
