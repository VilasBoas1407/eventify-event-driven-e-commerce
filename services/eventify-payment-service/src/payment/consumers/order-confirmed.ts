import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_CONFIRMED_EVENT } from '@vilasboas1407/kafka';
import type { OrderConfirmedEvent } from '@vilasboas1407/kafka';
import { HandleOrderConfirmedUseCase } from '../useCases/handle-order-confirmed.use-case';

@Controller()
export class OrderConfirmedConsumer {
  constructor(
    private readonly handleOrderConfirmedUseCase: HandleOrderConfirmedUseCase,
  ) {}

  @MessagePattern(ORDER_CONFIRMED_EVENT)
  async handleOrderConfirmedEvent(@Payload() message: OrderConfirmedEvent) {
    await this.handleOrderConfirmedUseCase.execute(message);
  }
}
