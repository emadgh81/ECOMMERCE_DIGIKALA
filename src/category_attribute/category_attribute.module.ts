import { Module } from '@nestjs/common';
import { CategoryAttributeService } from './category_attribute.service';
import { CategoryAttributeController } from './category_attribute.controller';

@Module({
  controllers: [CategoryAttributeController],
  providers: [CategoryAttributeService],
})
export class CategoryAttributeModule {}
