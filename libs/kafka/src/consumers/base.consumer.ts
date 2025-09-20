import { Inject, Injectable } from "@nestjs/common";
import { Kafka, Consumer } from "kafkajs";
import { KAFKA_CONFIG } from "../kafka.module";

@Injectable()
export class BaseConsumer {
  private consumer: Consumer;

  constructor(
    @Inject(KAFKA_CONFIG)
    private config: { brokers: string[]; groupId: string }
  ) {
    this.consumer = new Kafka({
      clientId: "consumer-client",
      brokers: config.brokers,
    }).consumer({ groupId: config.groupId });
  }

  async connect() {
    await this.consumer.connect();
  }

  async disconnect() {
    await this.consumer.disconnect();
  }

  async subscribe(
    topic: string,
    eachMessage: ({ message }: { message: any }) => Promise<void>
  ) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({ eachMessage });
  }
}
