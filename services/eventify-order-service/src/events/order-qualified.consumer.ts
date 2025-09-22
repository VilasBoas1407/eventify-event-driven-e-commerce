import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_QUALIFIED_EVENT } from '@vilasboas1407/kafka';
import type { OrderQualifiedEvent } from '@vilasboas1407/kafka';
import { HandleOrderQualifiedUseCase } from 'src/orders/useCases/handle-order-qualified.use-case';

@Controller()
export class OrderQualifiedConsumer {
  constructor(private readonly handleOrderQualifiedUseCase: HandleOrderQualifiedUseCase) {}

  @MessagePattern(ORDER_QUALIFIED_EVENT)
  async handleOrderQualifiedEvent(@Payload() message: OrderQualifiedEvent) {
    await this.handleOrderQualifiedUseCase.execute(message);
  }
}
