import { Injectable } from '@nestjs/common';
import { CreatePaymentVerfictionDto } from './dto/create-payment_verfiction.dto';
import { UpdatePaymentVerfictionDto } from './dto/update-payment_verfiction.dto';

@Injectable()
export class PaymentVerfictionService {
  create(createPaymentVerfictionDto: CreatePaymentVerfictionDto) {
    return 'This action adds a new paymentVerfiction';
  }

  findAll() {
    return `This action returns all paymentVerfiction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentVerfiction`;
  }

  update(id: number, updatePaymentVerfictionDto: UpdatePaymentVerfictionDto) {
    return `This action updates a #${id} paymentVerfiction`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentVerfiction`;
  }
}
