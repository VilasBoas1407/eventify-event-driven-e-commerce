# ADR-002: Broker de Eventos para Distribuição dos Eventos

**Status:** Aprovada  
**Data:** 18/09/2025  

## Contexto
Os microsserviços precisam se comunicar de forma assíncrona para processar pedidos de e-commerce de forma confiável, evitando perda de mensagens e processamento duplicado. A solução será implantada on-premise.  

## Decisão
Utilizar **RabbitMQ 3.10.X**, um broker de eventos orientado a filas, com padrão de entrega **"pelo menos uma vez"**.

## Justificativa
- RabbitMQ é leve, fácil de implantar on-premise e oferece suporte a múltiplos protocolos e pub/sub.  
- O throughput e baixa latência do RabbitMQ atendem à demanda de 5.000 pedidos/dia.  
- Garantia de entrega "pelo menos uma vez", combinada com consumidores idempotentes, evita duplicidade de processamento e pagamentos duplicados.  
- A equipe já possui experiência com **Java + Spring Boot 3.0**, que possui suporte nativo ao RabbitMQ, acelerando o desenvolvimento.  
- A retenção de eventos não é necessária; o RabbitMQ remove mensagens após o consumo, evitando custos de armazenamento desnecessários.  
- Atende à restrição de execução on-premise, permitindo instalação e manutenção do cluster de RabbitMQ nos servidores da empresa.

## Consequências
- Positivo: comunicação assíncrona confiável entre microsserviços.  
- Positivo: baixo custo de operação e manutenção on-premise.  
- Negativo: throughput limitado em comparação com brokers de alto desempenho como Kafka.  
- Próximos passos: configurar cluster RabbitMQ com alta disponibilidade e monitoramento.
