import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { BaseProducer } from "./producers/base.producer";
import { BaseConsumer } from "./consumers/base.consumer";
export declare class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly producer;
    private readonly consumer;
    constructor(producer: BaseProducer, consumer: BaseConsumer);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    sendMessage(topic: string, message: any): Promise<void>;
    subscribe(topic: string, eachMessage: ({ message }: {
        message: any;
    }) => Promise<void>): Promise<void>;
}
