import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { BaseProducer } from "./producers/base.producer";
import { BaseConsumer } from "./consumers/base.consumer";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly producer: BaseProducer,
    private readonly consumer: BaseConsumer
  ) {}

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.sendMessage(topic, message);
  }

  async subscribe(
    topic: string,
    eachMessage: ({ message }: { message: any }) => Promise<void>
  ) {
    await this.consumer.subscribe(topic, eachMessage);
  }
}
