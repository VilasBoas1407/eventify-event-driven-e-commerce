# Eventify Inventory Service

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  Microservice responsible for inventory management in the Eventify e-commerce platform
</p>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=alert_status" alt="Quality Gate Status" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=coverage" alt="Coverage" /></a>
  <img src="https://img.shields.io/badge/kafka-enabled-brightgreen.svg" alt="Kafka Enabled"/>
  <img src="https://img.shields.io/badge/inventory-management-blue.svg" alt="Inventory Management"/>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Overview

The Inventory Service is a critical component of the Eventify e-commerce platform, responsible for managing product stock levels, reservations, and inventory operations. This service ensures accurate stock tracking and prevents overselling through event-driven stock management.

## Key Features

- Real-time inventory tracking
- Stock reservation for orders
- Automatic stock updates
- Low stock alerts
- Stock reservation timeout handling
- Product availability checks
- Concurrent reservation handling
- Stock level history

## Business Rules

- Minimum stock level: 3 units
- Automatic reservation timeout: 30 minutes
- Low stock threshold: configurable per product
- Reservation validation before confirmation
- Concurrent access handling

## Event Flow

### Consumed Events
- `order-created`: Triggers stock reservation
- `order-canceled`: Releases reserved stock
- `payment-confirmed`: Confirms stock deduction

### Published Events
- `order-reservated`: When stock is successfully reserved
- `reservation-failed`: When stock reservation fails
- `low-stock-alert`: When product reaches low stock threshold

## Project Setup

```bash
# Install dependencies
$ npm install

# Set up environment variables
$ cp .env.example .env
```

## Running the Service

```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Environment Variables

```env
# Kafka Configuration
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=inventory-service
KAFKA_CLIENT_ID=inventory-service

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/inventory

# Service Configuration
PORT=3002
RESERVATION_TIMEOUT_MINUTES=30
LOW_STOCK_THRESHOLD=5
```

## Architecture

The service follows a modular architecture pattern:

```
src/
├── app.module.ts           # Main application module
├── main.ts                # Application entry point
├── inventory/            # Inventory domain
│   ├── consumers/       # Kafka event consumers
│   ├── contracts/       # Interfaces and types
│   ├── controllers/     # REST API controllers
│   ├── repository/     # Data access layer
│   ├── schema/         # MongoDB schemas
│   ├── services/       # Business services
│   ├── useCases/       # Business logic implementation
│   └── inventory.module.ts # Inventory module configuration
└── shared/             # Shared utilities and helpers
```

## API Documentation

### REST Endpoints

#### Products
- `GET /api/v1/products`: List all products with stock levels
- `GET /api/v1/products/:id`: Get product stock details
- `POST /api/v1/products`: Add new product to inventory
- `PATCH /api/v1/products/:id/stock`: Update product stock level

#### Stock Operations
- `POST /api/v1/stock/reserve`: Reserve stock for order
- `POST /api/v1/stock/release`: Release reserved stock
- `GET /api/v1/stock/history`: Get stock operation history

### Stock States

1. `AVAILABLE`: Stock ready for reservation
2. `RESERVED`: Temporarily held for an order
3. `CONFIRMED`: Deducted from available stock
4. `LOW_STOCK`: Below threshold level
5. `OUT_OF_STOCK`: No available units

## Error Handling

The service implements robust error handling for:

- Concurrent stock operations
- Invalid stock levels
- Reservation timeouts
- Database consistency
- Event processing failures

## Performance Considerations

- Optimistic locking for concurrent operations
- Caching of frequently accessed stock levels
- Batch processing for bulk operations
- Indexed queries for fast stock checks

## Related Services

- [Order Service](../eventify-order-service)
- [Payment Service](../eventify-payment-service)
- [Notification Service](../eventify-notification-service)

## Contributing

1. Create a feature branch
2. Commit your changes following our commit convention
3. Push to the branch
4. Create a Pull Request

## License

This project is part of Eventify and is [MIT licensed](../../LICENSE).
