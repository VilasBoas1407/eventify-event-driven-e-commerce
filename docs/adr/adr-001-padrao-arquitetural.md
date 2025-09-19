# ADR-001: Padrão Arquitetural

**Status:** Aprovada  
**Data:** 18/09/2025  

## Contexto
O sistema de e-commerce da empresa ABC precisa atender a uma demanda crescente de pedidos (5.000 pedidos/dia) e continuar escalando nos próximos anos. É necessário garantir alta disponibilidade, confiabilidade e capacidade de evolução rápida da solução. Além disso, a solução será composta por vários microsserviços, exigindo um framework que facilite a criação e manutenção desses serviços.  

## Decisão
Adotar **Arquitetura de Microsserviços** com **comunicação assíncrona baseada em EDA (Event-Driven Architecture)**, utilizando **NestJS** como framework principal.

## Justificativa
- A arquitetura de microsserviços com EDA possibilita escalabilidade e alta disponibilidade, essenciais para atender à demanda atual e futura.
- O **NestJS** é um framework moderno, modular e altamente escalável, que permite criar novos microsserviços de forma rápida e padronizada.
- A solução é flexível e desacoplada, permitindo que novos recursos sejam adicionados e implantados continuamente, sem necessidade de longos ciclos de release.
- A consistência eventual é suficiente para consultas de pedidos, alinhando-se aos requisitos do sistema.
- Facilita a competitividade da empresa no mercado, permitindo ajustes rápidos e contínuos.

## Consequências
- Positivo: sistema escalável, resiliente e extensível.  
- Positivo: criação rápida de novos microsserviços com NestJS.  
- Positivo: redução de acoplamento entre serviços e maior autonomia de times.  
- Negativo: gerenciamento de consistência e possíveis atrasos na atualização de dados.  
- Próximos passos: definir brokers de eventos e mecanismos de mensageria para suportar a comunicação assíncrona.
