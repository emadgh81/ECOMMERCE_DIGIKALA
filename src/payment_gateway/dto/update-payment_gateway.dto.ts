import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentGatewayDto } from './create-payment_gateway.dto';

export class UpdatePaymentGatewayDto extends PartialType(CreatePaymentGatewayDto) {}
