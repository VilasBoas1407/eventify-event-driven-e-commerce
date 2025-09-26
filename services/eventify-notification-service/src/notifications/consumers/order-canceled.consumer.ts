import { Controller } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ORDER_CANCELED_EVENT } from '@vilasboas1407/kafka';
import type { OrderCanceledEvent } from '@vilasboas1407/kafka';
import { HandleOrderCanceledUseCase } from '../useCases/handle-order-canceled.use-case';

@Controller()
export class OrderCreatedConsumer {
  constructor(private readonly useCase: HandleOrderCanceledUseCase) {}

  @MessagePattern(ORDER_CANCELED_EVENT)
  async handleQualificationOrderCreatedEvent(
    @Payload() message: OrderCanceledEvent,
  ) {
    await this.useCase.execute(message);
  }
}
