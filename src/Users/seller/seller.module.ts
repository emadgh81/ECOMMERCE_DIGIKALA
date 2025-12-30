import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { SELLER_REPOSITORY } from 'src/common/interfaces/Users/seller.repository.interface';
import { SellerPostgresRepository } from './repository/seller.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), UserModule],
  controllers: [SellerController],
  providers: [
    SellerService,
    { provide: SELLER_REPOSITORY, useClass: SellerPostgresRepository },
  ],
  exports: [SELLER_REPOSITORY],
})
export class SellerModule {}
