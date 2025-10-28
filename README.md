# Eventify – Event-Driven E-commerce Platform (NestJS)

**Eventify** is a practical project inspired by **Project 1** from Roberto Picanço's book *Arquitetura Orientada a Eventos: Soluções escaláveis e em tempo real com EDA*. Built with **NestJS**, it simulates a **scalable, event-driven e-commerce system**, demonstrating microservices, event brokers, and automated testing.

> This project is part of the book's final section, where three simplified, practical projects are proposed to apply EDA concepts learned throughout the chapters. Each project includes defining the problem, functional & non-functional requirements, constraints, and execution steps.

> This project is part of the book’s final section, where three simplified, practical projects are proposed to apply EDA concepts learned throughout the chapters. Each project includes defining the problem, functional & non-functional requirements, constraints, and execution steps.

---
## Summary
- [Installation](#-installation)
- [Kafka](#-kafka)
- [Packages](#-packages)
- [System Overview](#-system-overview)
- [Architecture](#-architecture)
- [Requirements](#-requirements)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing)
- [Deployment](#-deployment)


## 🚀 Installation

To run Eventify locally, you need **Docker** and **Docker Compose** installed. The setup uses Docker to spin up mongo databases and Kafka for event streaming.

### 1. Clone the repository

```bash
git clone https://github.com/VilasBoas1407/eventify-event-driven-e-commerce.git
cd eventify
```

### 2. Start the infrastructure

From the project root, run:
```bash
docker-compose up -d
```
**This will start:**

- Databases ( MongoDB)

- Kafka broker for event-driven communication

You can check running containers with:
``` bash
docker ps
```

#### 3. Verify services

Kafka UI at http://localhost:8080

Databases accessible on their respective ports

#### 4. Run the NestJS services

Each microservice is located in services/:

#### Example for auth service
``` bash
cd services/eventify-auth-service
npm install
npm run start:dev
```

Repeat for **order-service** and **notification-service**.

**TODO** : Create an docker-compose to up all services too.

## 📬 Kafka

To easily inspect Kafka topics and messages, we are using **AKHQ**, which provides a user-friendly web interface.

### 🔹 Accessing AKHQ

1. Make sure all Docker services are running:

```bash
  docker-compose up -d
```

AKHQ will be available in your browser at port 8080:

```bash
http://localhost:8080
```


### Topics

| Topic               | Producer             | Consumers                                 | Description                                                                                                                 |
| -------------------- | -------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `order-created`      | Order Service        | Qualification Service, Inventory Service   | Triggered whenever a new order is created. Services consume this event to process qualification and inventory updates.       |
| `order-canceled`     | Order Service        | Qualification Service, Inventory Service   | Triggered when an order is canceled. Consumers update or rollback related qualification and inventory data.                 |
| `order-qualified`    | Qualification Service | Order Service                              | Emitted after the order qualification process is completed. Indicates whether the order meets all qualification requirements. |
| `order-reservated`   | Inventory Service    | Order Service                              | Emitted when inventory has been successfully reserved for an order.                                                         |
| `order-confirmed`    | Order Service        | Notification Service, Payment Service       | Triggered when both qualification and reservation are completed, confirming the order.                                      |
| `payment-autorized`  | Payment Service      | Order Service                              | Triggered when payment authorization is successfully processed by the payment provider.                                     |
| `payment-confirmed`  | Payment Service      | Order Service, Notification Service         | Emitted after payment confirmation, indicating the transaction was successfully completed.                                  |



## 📦 Packages

In addition to services, the project also includes internal packages that centralize implementations shared across microservices.

Currently we have the package **@vilasboas1407/kafka**, which is responsible for:

- Abstracting Kafka integration (producers and consumers).

- Defining the event structures that can be emitted and consumed by the system.

- Ensuring code standardization and reusability across services.
To update and publish a package using standard-version:

Increment the version automatically
Standard-version will bump the version based on your commit messages (following conventional commits). You just need to run:
```bash
npm run release
```

This will:

- Update the version in package.json

- Generate or update the CHANGELOG.md

- Commit the changes

- Build the package

- Publish to the npm registry


**Update the package in other projects**
```bash
npm install @vilasboas1407/kafka@latest
```


💡 Note: This workflow leverages the standard-version library, which automates version management and changelog generation. By using npm run release, you no longer need to manually edit the version or the changelog.

This process ensures that all microservices remain compatible and use the latest implementation.

## 📝 System Overview

The fictitious company **ABC** faced a major problem: its e-commerce system could not keep up with growing demand, which risked revenue loss and reduced credibility. The COVID-19 pandemic further accelerated sales, increasing from **500 orders/day to 5,000 orders/day**.  

**Order Flow:**

1. Customer places an order with delivery address and payment info.  
2. System validates the address; invalid addresses trigger cancellation & email notification.  
3. Checks product availability in stock; missing products trigger cancellation & notification.  
4. If address is valid and stock is sufficient, payment is processed via a third-party gateway.  
5. Approved payments trigger order preparation.  
6. After preparation, the order is shipped via a delivery service and the customer is notified.  
7. Once delivered, the order status is updated to “delivered.”  
8. Declined payments notify the customer immediately.  
9. Any errors during processing send the order to a central operations hub for manual handling.  

---

## ⚙️ Architecture

- **Event Broker** – Handles asynchronous communication between microservices (RabbitMQ, Kafka, etc.).  
- **Microservices** – Independent modules for payments, inventory, logistics, and notifications.  
- **Event Orchestration & Choreography** – Ensures reliable order processing.  
- **API & Event Documentation** – OpenAPI & AsyncAPI for REST and event endpoints.  
- **NestJS Modules & Providers** – Organized for scalability and maintainability.  

**Tech Stack:**  
- NestJS / Node.js  
- RabbitMQ / Kafka  
- MongoDB / PostgreSQL  
- Postman / BDD for automated tests  

---

## 📝 Requirements

**Functional Requirements:**  
- Mandatory address and payment info  
- Deliveries limited to capital cities  
- Product considered in stock if ≥ 3 units  
- Customers can track order status  

**Non-Functional Requirements:**  
- High availability & scalability to handle demand growth  
- Reliability: orders must not be lost; duplicate payments are prohibited  
- Eventual consistency: minor delays in order status updates are acceptable  
- Extensible architecture for future business evolution  

**Constraints:**  
- Entire solution must be deployed and run on the client’s **on-premise** infrastructure due to legal requirements  

---

## ⚡ Development Workflow

The project follows four main stages, as proposed in the book:

1. **Broker & Architecture Selection** – Choose the event broker and architectural pattern.  
2. **Solution Design** – Create OpenAPI & AsyncAPI documentation, architecture diagrams, and event choreography diagrams.  
3. **Testing** – Define happy-path scenarios using **BDD** and automate with **Postman**.  
4. **Implementation** – Develop the solution according to design artifacts and tests, including deployment.  

---

## 🧪 Testing

- TODO

---

## 📦 Deployment

- On-premise deployment required  
- Must satisfy reliability, scalability, and availability requirements
- Containerized deployment using Docker
- Infrastructure as Code using Docker Compose
- CI/CD pipeline for automated deployments

### Production Requirements:
- High availability setup
- Load balancing
- Monitoring and alerting
- Backup and disaster recovery

---

> **Note:** Eventify is an educational project based on Roberto Picanço's *Event-Driven Architecture: Scalable and Real-Time Solutions with EDA*. It demonstrates **NestJS microservices**, event-driven flows, and best practices for building scalable e-commerce platforms.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
