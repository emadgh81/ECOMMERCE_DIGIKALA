import { Module } from '@nestjs/common';
import { PaymentRequestService } from './payment_request.service';
import { PaymentRequestController } from './payment_request.controller';

@Module({
  controllers: [PaymentRequestController],
  providers: [PaymentRequestService],
})
export class PaymentRequestModule {}
