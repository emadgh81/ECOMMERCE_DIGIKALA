import { Module } from '@nestjs/common';
import { PaymentVerfictionService } from './payment_verfiction.service';
import { PaymentVerfictionController } from './payment_verfiction.controller';

@Module({
  controllers: [PaymentVerfictionController],
  providers: [PaymentVerfictionService],
})
export class PaymentVerfictionModule {}
