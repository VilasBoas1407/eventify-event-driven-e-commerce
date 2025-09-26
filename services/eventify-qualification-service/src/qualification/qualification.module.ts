import { Module } from '@nestjs/common';
import { KafkaModule } from '@vilasboas1407/kafka';
import { QualificationOrderUseCase } from './useCases/qualification-order-use-case';
import { QualificationConsumer } from './consumers/order-created.consumer';

@Module({
  imports: [KafkaModule],
  providers: [QualificationOrderUseCase],
  exports: [QualificationOrderUseCase],
  controllers: [QualificationConsumer],
})
export class QualificationModule {}
