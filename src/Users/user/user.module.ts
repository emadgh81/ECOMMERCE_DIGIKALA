import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPostgresRepository } from './repository/user.repository';
import { USER_REPOSITORY } from 'src/common/interfaces/Users/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserPostgresRepository,
    { provide: USER_REPOSITORY, useClass: UserPostgresRepository },
  ],
  exports: [UserService, USER_REPOSITORY],
})
export class UserModule {}
