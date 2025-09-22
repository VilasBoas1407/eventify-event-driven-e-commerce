import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderService } from './services/orders.service';
import { OrderRepository } from './repository/orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { KafkaModule } from '@vilasboas1407/kafka';
import { HandleOrderQualifiedUseCase } from './useCases/handle-order-qualified.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), KafkaModule],
  controllers: [OrdersController],
  providers: [OrderService, OrderRepository, HandleOrderQualifiedUseCase],
})
export class OrdersModule {}
