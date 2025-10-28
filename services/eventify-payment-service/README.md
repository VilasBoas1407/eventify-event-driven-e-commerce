# Eventify Payment Service

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  Microservice responsible for payment processing in the Eventify e-commerce platform
</p>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=alert_status" alt="Quality Gate Status" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=VilasBoas1407_projeto-1-eda-plataforma-e-commerce"><img src="https://sonarcloud.io/api/project_badges/measure?project=VilasBoas1407_projeto-1-eda-plataforma-e-commerce&metric=coverage" alt="Coverage" /></a>
  <img src="https://img.shields.io/badge/kafka-enabled-brightgreen.svg" alt="Kafka Enabled"/>
  <img src="https://img.shields.io/badge/payment-processing-blue.svg" alt="Payment Processing"/>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Overview

The Payment Service is a crucial component of the Eventify e-commerce platform, responsible for processing and managing payment transactions. This service handles payment authorization, confirmation, and failure scenarios through asynchronous event processing.

## Key Features

- Payment processing and authorization
- Multiple payment method support
- Integration with payment gateways
- Transaction history tracking
- Asynchronous event processing
- Error handling and recovery
- Payment status monitoring

## Event Flow

### Consumed Events
- `order-confirmed`: Triggers payment processing for a confirmed order
- `payment-cancellation-requested`: Handles payment cancellation requests

### Produced Events
- `payment-authorized`: Emitted after successful payment authorization
- `payment-confirmed`: Emitted after successful payment completion
- `payment-failed`: Emitted when payment processing fails

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
KAFKA_GROUP_ID=payment-service
KAFKA_CLIENT_ID=payment-service

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/payment

# Payment Gateway Configuration
PAYMENT_GATEWAY_API_KEY=your-api-key
PAYMENT_GATEWAY_URL=https://api.payment-gateway.com
```

## Architecture

The service follows a modular architecture pattern:

```
src/
├── app.module.ts          # Main application module
├── main.ts               # Application entry point
├── payment/             # Payment domain
│   ├── consumers/       # Kafka event consumers
│   ├── enum/           # Enumerations
│   ├── models/         # Domain models
│   ├── repository/     # Data access layer
│   ├── schemas/        # MongoDB schemas
│   ├── services/       # Business services
│   ├── useCases/       # Business logic implementation
│   └── payment.module.ts # Payment module configuration
└── shared/             # Shared utilities and helpers
```

### Key Components:

- **Consumers**: Handle incoming Kafka events
- **Models**: Define payment and transaction entities
- **Repository**: Manage data persistence
- **Services**: Implement payment gateway integration
- **Use Cases**: Implement payment business logic

## API Documentation

The service exposes internal endpoints for monitoring and management:

- `GET /health`: Service health check
- `GET /metrics`: Service metrics for monitoring
- `GET /payments`: List payments (admin only)
- `GET /payments/:id`: Get payment details (admin only)

## Related Services

- [Order Service](../eventify-order-service)
- [Notification Service](../eventify-notification-service)

## Contributing

1. Create a feature branch
2. Commit your changes following our commit convention
3. Push to the branch
4. Create a Pull Request

## License

This project is part of Eventify and is [MIT licensed](../../LICENSE).
