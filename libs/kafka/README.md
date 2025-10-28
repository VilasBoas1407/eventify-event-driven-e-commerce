# @vilasboas1407/kafka

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  A NestJS module for standardized Kafka integration in the Eventify e-commerce platform
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@vilasboas1407/kafka"><img src="https://img.shields.io/npm/v/@vilasboas1407/kafka.svg" alt="NPM Version" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=coverage" alt="Coverage" /></a>
  <img src="https://img.shields.io/badge/kafka-integration-brightgreen.svg" alt="Kafka Integration"/>
</p>

## Overview

This package provides a standardized way to integrate Kafka messaging in NestJS microservices within the Eventify platform. It handles event definitions, producer/consumer setup, and common Kafka configurations.

## Features

- Standardized Kafka configuration
- Type-safe event definitions
- Easy-to-use producer and consumer decorators
- Automatic reconnection handling
- Error handling and retries
- Event validation
- Logging and monitoring

## Installation

```bash
npm install @vilasboas1407/kafka
```

## Usage

### Module Configuration

```typescript
import { KafkaModule } from '@vilasboas1407/kafka';

@Module({
  imports: [
    KafkaModule.register({
      brokers: ['localhost:9092'],
      clientId: 'my-service',
      groupId: 'my-service-group'
    })
  ]
})
export class AppModule {}
```

### Producing Events

```typescript
import { KafkaService } from '@vilasboas1407/kafka';

@Injectable()
export class OrderService {
  constructor(private readonly kafkaService: KafkaService) {}

  async createOrder(order: Order) {
    await this.kafkaService.emit('order-created', {
      orderId: order.id,
      userId: order.userId,
      items: order.items
    });
  }
}
```

### Consuming Events

```typescript
import { KafkaConsumer } from '@vilasboas1407/kafka';

@Injectable()
export class OrderConsumer {
  @KafkaConsumer('order-created')
  async handleOrderCreated(payload: OrderCreatedEvent) {
    // Handle the order created event
  }
}
```

## Available Events

### Order Events
- `order-created`: Triggered when a new order is created
- `order-confirmed`: After qualification and inventory checks
- `order-canceled`: When an order is canceled

### Inventory Events
- `order-reservated`: When stock is successfully reserved
- `reservation-failed`: When stock reservation fails

### Payment Events
- `payment-authorized`: After payment authorization
- `payment-confirmed`: When payment is confirmed
- `payment-failed`: When payment fails

### Qualification Events
- `order-qualified`: After order qualification check
- `qualification-failed`: When qualification fails

## Configuration Options

```typescript
interface KafkaOptions {
  brokers: string[];
  clientId: string;
  groupId: string;
  ssl?: boolean;
  sasl?: {
    mechanism: 'plain' | 'scram-sha-256' | 'scram-sha-512';
    username: string;
    password: string;
  };
  retry?: {
    maxRetries: number;
    initialRetryTime: number;
    maxRetryTime: number;
  };
}
```

## Error Handling

The module includes built-in error handling for common scenarios:

- Connection failures
- Message parsing errors
- Consumer group rebalancing
- Retry mechanisms
- Dead letter queues

## Best Practices

1. Always define event interfaces
2. Use meaningful consumer group IDs
3. Implement proper error handling
4. Monitor consumer lag
5. Use appropriate partition counts
6. Configure reasonable timeout values

## Development

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Build the package
npm run build

# Publish to npm
npm run release
```

## Contributing

1. Create a feature branch
2. Commit your changes following our commit convention
3. Push to the branch
4. Create a Pull Request

## Versioning

We use [standard-version](https://github.com/conventional-changelog/standard-version) for versioning. For the versions available, see the [tags on this repository](https://github.com/VilasBoas1407/eventify-eda/tags).

```bash
# Create a new release
npm run release
```

## License

This project is [MIT licensed](../../LICENSE).
