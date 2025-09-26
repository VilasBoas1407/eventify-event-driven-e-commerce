import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { ORDER_CREATED_EVENT } from '@vilasboas1407/kafka';
import type { OrderCreatedEvent } from '@vilasboas1407/kafka';
import { QualificationOrderUseCase } from '../useCases/qualification-order-use-case';

@Controller()
export class QualificationConsumer {
  constructor(
    private readonly qualificationUseCase: QualificationOrderUseCase,
  ) {}

  @MessagePattern(ORDER_CREATED_EVENT)
  async handleQualificationOrderCreatedEvent(
    @Payload() message: OrderCreatedEvent,
  ) {
    await this.qualificationUseCase.execute(message);
  }
}
