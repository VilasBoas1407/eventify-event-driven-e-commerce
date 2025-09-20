"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedEvent = exports.ORDER_CREATED_EVENT = void 0;
exports.ORDER_CREATED_EVENT = "order-created";
class OrderCreatedEvent {
    constructor(orderId, costumerId) {
        this.orderId = orderId;
        this.costumerId = costumerId;
    }
}
exports.OrderCreatedEvent = OrderCreatedEvent;
//# sourceMappingURL=order-created.js.map