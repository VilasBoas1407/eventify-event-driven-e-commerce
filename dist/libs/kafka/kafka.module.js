"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = exports.KAFKA_CONFIG = void 0;
const common_1 = require("@nestjs/common");
const kafka_service_1 = require("./kafka.service");
const base_producer_1 = require("./producers/base.producer");
const base_consumer_1 = require("./consumers/base.consumer");
exports.KAFKA_CONFIG = "KAFKA_CONFIG";
let KafkaModule = class KafkaModule {
};
exports.KafkaModule = KafkaModule;
exports.KafkaModule = KafkaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            kafka_service_1.KafkaService,
            base_producer_1.BaseProducer,
            base_consumer_1.BaseConsumer,
            {
                provide: exports.KAFKA_CONFIG,
                useValue: {
                    clientId: "eventify-service",
                    brokers: ["localhost:9092"],
                    groupId: "eventify-group", // usado no consumer
                },
            },
        ],
        exports: [kafka_service_1.KafkaService],
    })
], KafkaModule);
//# sourceMappingURL=kafka.module.js.map