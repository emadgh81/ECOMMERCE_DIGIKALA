import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentVerfictionDto } from './create-payment_verfiction.dto';

export class UpdatePaymentVerfictionDto extends PartialType(CreatePaymentVerfictionDto) {}
