import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ORDER_CREATED_EVENT } from '@vilasboas1407/kafka';
import type { OrderCreatedEvent } from '@vilasboas1407/kafka';
import { HandleOrderCreatedUseCase } from '../useCases/handler-order-created.use-case';

@Controller()
export class OrderCreatedConsumer {
  private readonly logger = new Logger(OrderCreatedConsumer.name);

  constructor(
    private readonly handleOrderCreatedUseCase: HandleOrderCreatedUseCase,
  ) {}

  @MessagePattern(ORDER_CREATED_EVENT)
  async handleOrderCreated(@Payload() message: OrderCreatedEvent) {
    try {
      this.logger.log(
        `Received order-created-event: ${JSON.stringify(message)}`,
      );
      await this.handleOrderCreatedUseCase.execute(message);
      this.logger.log(
        `Successfully processed order-created-event with id: ${message.orderId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to process order-created-event: ${error.message}`,
        error.stack,
      );
    }
  }
}
