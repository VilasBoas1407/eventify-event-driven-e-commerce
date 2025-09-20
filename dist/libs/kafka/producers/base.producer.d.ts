export declare class BaseProducer {
    private config;
    private producer;
    constructor(config: {
        clientId: string;
        brokers: string[];
    });
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendMessage(topic: string, message: any): Promise<void>;
}
