import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderService } from './services/orders.service';
import { OrderRepository } from './repository/orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { KafkaModule } from '@vilasboas1407/kafka';
import { HandleOrderQualifiedUseCase } from './useCases/handle-order-qualified.use-case';
import { OrderQualifiedConsumer } from 'src/orders/consumers/order-qualified.consumer';
import { CreateOrderUseCase } from './useCases/create-order.use-case';
import { OrderReservatedConsumer } from './consumers/order-reservated.consumer';
import { HandlerOrderReservatedUseCase } from './useCases/handle-order-reservated.use-case';
import { ProductService } from './services/product.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), KafkaModule],
  controllers: [OrdersController, OrderQualifiedConsumer, OrderReservatedConsumer],
  providers: [
    OrderService,
    OrderRepository,
    HandleOrderQualifiedUseCase,
    CreateOrderUseCase,
    HandlerOrderReservatedUseCase,
    ProductService,
    HttpModule,
  ],
})
export class OrdersModule {}
