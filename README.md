# Plataforma de E-commerce - Projeto EDA

Este projeto é uma implementação prática do **Projeto 1** do livro *Arquitetura Orientada a Eventos: Soluções Escaláveis e em Tempo Real com EDA* de Roberto Picanço.  

O objetivo é demonstrar a aplicação dos conceitos e padrões de **Arquitetura Orientada a Eventos (EDA)** em um cenário de e-commerce, utilizando brokers de eventos, design de soluções distribuídas e práticas de teste automatizado.

---

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Escopo do Sistema](#escopo-do-sistema)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Restrições](#restrições)
- [Arquitetura da Solução](#arquitetura-da-solução)
- [Execução do Projeto](#execução-do-projeto)
- [Testes](#testes)
- [Deploy](#deploy)

---

## Descrição do Projeto

A empresa fictícia **ABC** enfrenta problemas de escalabilidade em sua plataforma de e-commerce, principalmente devido ao aumento repentino da demanda (de 500 para 5.000 pedidos/dia).  
O projeto visa implementar uma solução que garanta:

- Processamento confiável de pedidos;
- Alta disponibilidade e escalabilidade;
- Extensibilidade para futuras funcionalidades.

O sistema segue uma abordagem **orientada a eventos**, integrando um **broker de eventos** para orquestrar a comunicação entre serviços.

---

## Escopo do Sistema

O fluxo principal de pedidos inclui:

1. O cliente realiza um pedido informando endereço e dados de pagamento;
2. O sistema verifica elegibilidade do endereço;
3. Em caso de endereço inválido, notifica o cliente via e-mail e cancela o pedido;
4. Verifica disponibilidade dos produtos no estoque;
5. Caso faltem produtos, notifica o cliente e cancela o pedido;
6. Processa pagamento via gateway de terceiros;
7. Inicia preparação do pedido se pagamento aprovado;
8. Realiza envio via serviço de entrega e notifica cliente;
9. Finaliza pedido com status entregue;
10. Em caso de pagamento negado, notifica o cliente.

---

## Requisitos Funcionais

- Endereço e dados de pagamento são obrigatórios;
- Entregas apenas para capitais;
- Produto considerado em estoque quando houver pelo menos 3 unidades;
- Cliente pode consultar situação do pedido.

---

## Requisitos Não Funcionais

- **Alta disponibilidade e escalabilidade**: atender à demanda crescente de pedidos;
- **Confiabilidade**: pedidos não podem ser perdidos e pagamentos duplicados não são aceitos;
- **Consistência eventual**: pequenas latências na atualização do status de pedidos são aceitáveis;
- **Extensibilidade**: permitir inclusão de novas funcionalidades com mínimo impacto.

---

## Restrições

- Toda a solução deve ser implantada e executada na infraestrutura do cliente (**on-premise**) por questões legais.

---

## Arquitetura da Solução

A arquitetura do sistema é baseada em:

- **Broker de eventos** para comunicação assíncrona;
- **Orquestração de eventos e coreografia** para processamento de pedidos;
- Diagramas **OpenAPI** e **AsyncAPI** para documentação de APIs e eventos;
- Serviços independentes para processamento de pagamentos, estoque e logística.

---

## Execução do Projeto

O desenvolvimento do projeto segue quatro etapas:

1. **Escolha do broker e padrão arquitetural**: definir ferramentas e arquitetura mais adequadas;
2. **Design da solução**: gerar artefatos de arquitetura, diagramas de eventos e documentação;
3. **Testes**: criar cenários do caminho feliz usando **BDD** e automatizar com **Postman**;
4. **Implementação**: codificar a solução baseada nos artefatos de design e realizar o **deploy**.

---

## Testes

- Cenários principais do caminho feliz estão automatizados via **Postman**;
- Possibilidade de comparar implementação própria com a solução de referência disponível no repositório.

---

## Deploy

- A implantação deve ser realizada na infraestrutura on-premise do cliente;
- A solução deve garantir alta disponibilidade, confiabilidade e escalabilidade conforme definido nos requisitos não funcionais.

---

> **Nota:** Este projeto foi desenvolvido com fins educacionais e como exercício prático de implementação de soluções EDA, baseado no livro de Roberto Picanço.

