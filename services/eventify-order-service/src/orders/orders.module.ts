import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderService } from './services/orders.service';
import { OrderRepository } from './repository/orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrderService, OrderRepository],
})
export class OrdersModule {}
