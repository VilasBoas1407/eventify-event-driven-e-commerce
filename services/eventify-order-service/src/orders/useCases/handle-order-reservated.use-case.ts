import { Controller, Logger } from '@nestjs/common';
import { KafkaService, OrderReservedEvent } from '@vilasboas1407/kafka';
import { OrderRepository } from '../repository/orders.repository';
import { OrderStatus } from 'src/shared/enum/OrderStatus';
import { HandlerOrderBase } from './handle-base-order.use-case';

@Controller()
export class HandlerOrderReservatedUseCase extends HandlerOrderBase {
  constructor(
    protected readonly orderRepository: OrderRepository,
    protected readonly kafkaService: KafkaService
  ) {
    super(orderRepository, kafkaService);
  }

  async execute(message: OrderReservedEvent) {
    const order = await this.orderRepository.findById(message.orderId);

    if (!order) {
      this.logger.error(`Order with id ${message.orderId} not found`);
      return;
    }

    if ([OrderStatus.CANCELED, OrderStatus.CONFIRMED].includes(order.status)) {
      this.logger.warn(`Order ${message.orderId} already finalized with status ${order.status}`);
      return;
    }

    order.reservedAt = new Date();
    this.logger.log(`Order ${order.id} reservated`);

    if (order.status == OrderStatus.QUALIFIED) {
      order.status = OrderStatus.CONFIRMED;
      await this.confirmOrder(order);
    } else {
      order.status = OrderStatus.RESERVED;
    }
    await this.orderRepository.update(order);
  }
}
