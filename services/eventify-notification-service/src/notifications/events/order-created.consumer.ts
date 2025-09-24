import { Controller } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ORDER_CREATED_EVENT } from '@vilasboas1407/kafka';
import type { OrderCreatedEvent } from '@vilasboas1407/kafka';
import { HandleOrderCreatedUseCase } from '../useCases/handle-order-created.use-case';

@Controller()
export class OrderCreatedConsumer {
  constructor(private readonly useCase: HandleOrderCreatedUseCase) {}

  @MessagePattern(ORDER_CREATED_EVENT)
  async handleQualificationOrderCreatedEvent(
    @Payload() message: OrderCreatedEvent,
  ) {
    await this.useCase.execute(message);
  }
}
