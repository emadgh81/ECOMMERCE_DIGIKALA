import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentRequestService } from './payment_request.service';
import { CreatePaymentRequestDto } from './dto/create-payment_request.dto';
import { UpdatePaymentRequestDto } from './dto/update-payment_request.dto';

@Controller('payment-request')
export class PaymentRequestController {
  constructor(private readonly paymentRequestService: PaymentRequestService) {}

  @Post()
  create(@Body() createPaymentRequestDto: CreatePaymentRequestDto) {
    return this.paymentRequestService.create(createPaymentRequestDto);
  }

  @Get()
  findAll() {
    return this.paymentRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentRequestDto: UpdatePaymentRequestDto) {
    return this.paymentRequestService.update(+id, updatePaymentRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentRequestService.remove(+id);
  }
}
