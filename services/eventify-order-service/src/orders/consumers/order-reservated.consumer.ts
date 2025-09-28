import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ORDER_RESERVED_EVENT } from '@vilasboas1407/kafka';
import type { OrderReservedEvent } from '@vilasboas1407/kafka';

@Controller()
export class OrderCreatedConsumer {
  private readonly logger = new Logger(OrderCreatedConsumer.name);

  constructor() {}

  @MessagePattern(ORDER_RESERVED_EVENT)
  async handleOrderCreated(@Payload() message: OrderReservedEvent) {
    try {
      this.logger.log(`Received order-reservated-event: ${JSON.stringify(message)}`);

      this.logger.log(`Successfully processed order-reservated-event with id: ${message.orderId}`);
    } catch (error) {
      this.logger.error(`Failed to process order-reservated-event: ${error.message}`, error.stack);
    }
  }
}
