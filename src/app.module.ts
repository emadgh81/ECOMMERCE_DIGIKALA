import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ReviweModule } from './reviwe/reviwe.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { PaymentModule } from './payment/payment.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentRequestModule } from './payment_request/payment_request.module';
import { PaymentVerfictionModule } from './payment_verfiction/payment_verfiction.module';
import { PaymentGatewayModule } from './payment_gateway/payment_gateway.module';
import { ProductAttributeValueModule } from './product_attribute_value/product_attribute_value.module';
import { CategoryAttributeModule } from './category_attribute/category_attribute.module';
import { AttributeModule } from './attribute/attribute.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: [],
        migrationsRun: false,
      }),
    }),
    UserModule,
    SellerModule,
    AuthModule,
    CategoryModule,
    ReviweModule,
    CartModule,
    CartItemModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
    TransactionModule,
    PaymentRequestModule,
    PaymentVerfictionModule,
    PaymentGatewayModule,
    ProductAttributeValueModule,
    CategoryAttributeModule,
    AttributeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
