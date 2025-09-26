import { Module } from '@nestjs/common';
import { HandleOrderCreatedUseCase } from './useCases/handle-order-created.use-case';
import { OrderCreatedConsumer } from './consumers/order-created.consumer';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [OrderCreatedConsumer],
  providers: [HandleOrderCreatedUseCase],
})
export class NotificationsModule {}
