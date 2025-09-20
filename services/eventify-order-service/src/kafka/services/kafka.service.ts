import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_PRODUCER } from '../constants/kafka.constants';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(@Inject(KAFKA_PRODUCER) private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async emit(topic: string, message: any) {
    await this.kafkaClient.emit(topic, {
      key: message.id || null,
      value: JSON.stringify(message),
    });
  }
}
