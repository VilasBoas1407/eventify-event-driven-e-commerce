# Eventify Order Service

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  Core order management microservice for the Eventify e-commerce platform
</p>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=alert_status" alt="Quality Gate Status" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=coverage" alt="Coverage" /></a>
  <img src="https://img.shields.io/badge/kafka-enabled-brightgreen.svg" alt="Kafka Enabled"/>
  <img src="https://img.shields.io/badge/orders-management-blue.svg" alt="Orders Management"/>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Overview

The Order Service is the central component of the Eventify e-commerce platform, orchestrating the entire order lifecycle from creation to fulfillment. This service manages order states, coordinates with other services through events, and provides a REST API for order management.

## Key Features

- Complete order lifecycle management
- Event-driven order processing
- Order validation and verification
- Integration with other services (Payment, Inventory, etc.)
- Order status tracking and updates
- RESTful API for order operations
- Asynchronous event processing

## Event Flow

### Published Events
- `order-created`: When a new order is created
- `order-confirmed`: After qualification and inventory checks
- `order-canceled`: When an order is canceled
- `order-completed`: When an order is fully processed

### Consumed Events
- `order-qualified`: From Qualification Service
- `order-reservated`: From Inventory Service
- `payment-confirmed`: From Payment Service
- `payment-failed`: From Payment Service

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
KAFKA_GROUP_ID=order-service
KAFKA_CLIENT_ID=order-service

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/orders

# API Configuration
PORT=3000
API_PREFIX=/api/v1
```

## Architecture

The service follows a modular architecture pattern:

```
src/
├── app.module.ts           # Main application module
├── main.ts                # Application entry point
├── config/               # Configuration files
├── orders/              # Orders domain
│   ├── consumers/       # Kafka event consumers
│   ├── contracts/       # Interfaces and types
│   ├── models/         # Domain models
│   ├── repository/     # Data access layer
│   ├── schemas/        # MongoDB schemas
│   ├── services/       # Business services
│   ├── useCases/       # Business logic implementation
│   ├── orders.controller.ts # REST API controllers
│   └── orders.module.ts    # Orders module configuration
└── shared/             # Shared utilities and helpers
```

## API Documentation

### REST Endpoints

#### Orders
- `POST /api/v1/orders`: Create new order
- `GET /api/v1/orders`: List all orders
- `GET /api/v1/orders/:id`: Get order details
- `PATCH /api/v1/orders/:id/cancel`: Cancel order
- `GET /api/v1/orders/:id/status`: Get order status

### Order States

1. `CREATED`: Initial state
2. `PENDING_QUALIFICATION`: Awaiting qualification check
3. `QUALIFIED`: Passed qualification check
4. `PENDING_INVENTORY`: Checking inventory
5. `INVENTORY_RESERVED`: Inventory reserved
6. `PENDING_PAYMENT`: Awaiting payment
7. `PAYMENT_CONFIRMED`: Payment received
8. `COMPLETED`: Order fulfilled
9. `CANCELED`: Order canceled

## Error Handling

The service implements robust error handling:

- Business rule violations
- Event processing failures
- Database operation errors
- Integration errors

Each error type has specific handling and recovery strategies.

## Related Services

- [Qualification Service](../eventify-qualification-service)
- [Inventory Service](../eventify-inventory-service)
- [Payment Service](../eventify-payment-service)
- [Notification Service](../eventify-notification-service)

## Contributing

1. Create a feature branch
2. Commit your changes following our commit convention
3. Push to the branch
4. Create a Pull Request

## License

This project is part of Eventify and is [MIT licensed](../../LICENSE).
