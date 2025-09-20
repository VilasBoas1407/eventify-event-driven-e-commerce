export declare const ORDER_CREATED_EVENT = "order-created";
export declare class OrderCreatedEvent {
    constructor(orderId: string, costumerId: string);
    orderId: string;
    costumerId: string;
}
