import { Module } from '@nestjs/common';
import { UserModule } from './Users/user/user.module';
import { SellerModule } from './Users/seller/seller.module';
import { AuthModule } from './Users/auth/auth.module';
import { ReviewModule } from './Reviews/review/review.module';
import { OrderModule } from './Orders/order/order.module';
import { OrderItemModule } from './Orders/order_item/order_item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantModule } from './Products/product_variant/product_variant.module';
import { ProductAttributeModule } from './Products/product_attribute/product_attribute.module';
import { ProductCategoryAttributeModule } from './Products/product_category_attribute/product_category_attribute.module';
import { ProductAttributeValueModule } from './Products/product_attribute_value/product_attribute_value.module';
import { PaymentGatewayModule } from './Payments/payment_gateway/payment_gateway.module';
import { TransactionModule } from './Payments/transaction/transaction.module';
import { PaymentModule } from './Payments/payment/payment.module';
import { ProductModule } from './Products/product/product.module';
import { CartItemModule } from './Carts/cart_item/cart_item.module';
import { CartModule } from './Carts/cart/cart.module';
import { ProductCategoryModule } from './Products/product_category/product_category.module';

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
      }),
    }),
    UserModule,
    SellerModule,
    AuthModule,
    ProductCategoryModule,
    ReviewModule,
    CartModule,
    CartItemModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
    TransactionModule,
    PaymentGatewayModule,
    ProductAttributeValueModule,
    ProductCategoryAttributeModule,
    ProductAttributeModule,
    ProductVariantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
