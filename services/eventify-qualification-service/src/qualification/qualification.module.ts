import { Module } from '@nestjs/common';
import { KafkaModule } from '@vilasboas1407/kafka';
import { QualificateOrderUseCase } from './useCases/qualificate-order-use-case';

@Module({
  imports: [KafkaModule],
  providers: [QualificateOrderUseCase],
  exports: [],
})
export class QualificationModule {}
