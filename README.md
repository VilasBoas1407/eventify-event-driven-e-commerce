# Eventify – Event-Driven E-commerce Platform (NestJS)

**Eventify** is a practical project inspired by **Project 1** from Roberto Picanço’s book *Arquitetura Orientada a Eventos: Soluções escaláveis e em tempo real com EDA*. Built with **NestJS**, it simulates a **scalable, event-driven e-commerce system**, demonstrating microservices, event brokers, and automated testing.

> This project is part of the book’s final section, where three simplified, practical projects are proposed to apply EDA concepts learned throughout the chapters. Each project includes defining the problem, functional & non-functional requirements, constraints, and execution steps.

---
## Summary

- [Run application](#running)
- [System Overview](#system-overview)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)


## 📦 System Overview

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

---

> **Note:** Eventify is an educational project based on Roberto Picanço’s *Event-Driven Architecture: Scalable and Real-Time Solutions with EDA*. It demonstrates **NestJS microservices**, event-driven flows, and best practices for building scalable e-commerce platforms.
