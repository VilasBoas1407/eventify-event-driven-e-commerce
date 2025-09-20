export declare class BaseConsumer {
    private config;
    private consumer;
    constructor(config: {
        brokers: string[];
        groupId: string;
    });
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    subscribe(topic: string, eachMessage: ({ message }: {
        message: any;
    }) => Promise<void>): Promise<void>;
}
