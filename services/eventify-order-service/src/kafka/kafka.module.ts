import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_PRODUCER } from './constants/kafka.constants';
import { KafkaService } from './services/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_PRODUCER,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-service',
            brokers: ['localhost:29092'],
          },
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
