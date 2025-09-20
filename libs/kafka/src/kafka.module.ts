import { Module, Global } from "@nestjs/common";
import { KafkaService } from "./kafka.service";
import { BaseProducer } from "./producers/base.producer";
import { BaseConsumer } from "./consumers/base.consumer";

export const KAFKA_CONFIG = "KAFKA_CONFIG";

@Global()
@Module({
  providers: [
    KafkaService,
    BaseProducer,
    BaseConsumer,
    {
      provide: KAFKA_CONFIG,
      useValue: {
        clientId: "eventify-service",
        brokers: ["localhost:9092"],
        groupId: "eventify-group", // usado no consumer
      },
    },
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
