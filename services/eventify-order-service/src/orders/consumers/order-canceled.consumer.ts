import { Controller, Logger, NotImplementedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_CANCELED_EVENT } from '@vilasboas1407/kafka';
import type { OrderCanceledEvent } from '@vilasboas1407/kafka';

@Controller()
export class OrderCanceledConsumer {
  private readonly logger = new Logger(OrderCanceledConsumer.name);

  @MessagePattern(ORDER_CANCELED_EVENT)
  async handleOrderCanceledEvent(@Payload() message: OrderCanceledEvent) {
    this.logger.error(message);
    throw new NotImplementedException();
  }
}
