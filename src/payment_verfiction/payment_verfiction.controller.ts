import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentVerfictionService } from './payment_verfiction.service';
import { CreatePaymentVerfictionDto } from './dto/create-payment_verfiction.dto';
import { UpdatePaymentVerfictionDto } from './dto/update-payment_verfiction.dto';

@Controller('payment-verfiction')
export class PaymentVerfictionController {
  constructor(private readonly paymentVerfictionService: PaymentVerfictionService) {}

  @Post()
  create(@Body() createPaymentVerfictionDto: CreatePaymentVerfictionDto) {
    return this.paymentVerfictionService.create(createPaymentVerfictionDto);
  }

  @Get()
  findAll() {
    return this.paymentVerfictionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentVerfictionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentVerfictionDto: UpdatePaymentVerfictionDto) {
    return this.paymentVerfictionService.update(+id, updatePaymentVerfictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentVerfictionService.remove(+id);
  }
}
