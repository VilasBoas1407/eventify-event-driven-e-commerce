"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConsumer = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const kafka_module_1 = require("../kafka.module");
let BaseConsumer = class BaseConsumer {
    constructor(config) {
        this.config = config;
        this.consumer = new kafkajs_1.Kafka({
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
    async subscribe(topic, eachMessage) {
        await this.consumer.subscribe({ topic, fromBeginning: true });
        await this.consumer.run({ eachMessage });
    }
};
exports.BaseConsumer = BaseConsumer;
exports.BaseConsumer = BaseConsumer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(kafka_module_1.KAFKA_CONFIG)),
    __metadata("design:paramtypes", [Object])
], BaseConsumer);
//# sourceMappingURL=base.consumer.js.map