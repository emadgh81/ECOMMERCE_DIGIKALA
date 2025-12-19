import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentRequestDto } from './create-payment_request.dto';

export class UpdatePaymentRequestDto extends PartialType(CreatePaymentRequestDto) {}
