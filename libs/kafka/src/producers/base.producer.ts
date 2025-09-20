import { Inject, Injectable } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";
import { KAFKA_CONFIG } from "../kafka.module";

@Injectable()
export class BaseProducer {
  private producer: Producer;

  constructor(
    @Inject(KAFKA_CONFIG)
    private config: { clientId: string; brokers: string[] }
  ) {
    this.producer = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
    }).producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
