import { Module } from '@nestjs/common';
import { ReviweService } from './reviwe.service';
import { ReviweController } from './reviwe.controller';

@Module({
  controllers: [ReviweController],
  providers: [ReviweService],
})
export class ReviweModule {}
