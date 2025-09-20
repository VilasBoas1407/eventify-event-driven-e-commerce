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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const base_producer_1 = require("./producers/base.producer");
const base_consumer_1 = require("./consumers/base.consumer");
let KafkaService = class KafkaService {
    constructor(producer, consumer) {
        this.producer = producer;
        this.consumer = consumer;
    }
    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();
    }
    async onModuleDestroy() {
        await this.producer.disconnect();
        await this.consumer.disconnect();
    }
    async sendMessage(topic, message) {
        await this.producer.sendMessage(topic, message);
    }
    async subscribe(topic, eachMessage) {
        await this.consumer.subscribe(topic, eachMessage);
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [base_producer_1.BaseProducer,
        base_consumer_1.BaseConsumer])
], KafkaService);
//# sourceMappingURL=kafka.service.js.map