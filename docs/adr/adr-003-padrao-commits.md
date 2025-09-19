# ADR-003: Padrão de Commits

**Status:** Aprovada  
**Data:** 18/09/2025  

## Contexto
Como o projeto será composto por múltiplos microsserviços desenvolvidos com **NestJS**, é importante adotar uma convenção de commits que facilite:  

- Entendimento do histórico de alterações;  
- Automatização de versionamento e release;  
- Integração com pipelines CI/CD.  

## Decisão
Adotar **Conventional Commits** como padrão de mensagens de commit no repositório.  

Exemplos de tipos de commits:

- `feat:` para novas funcionalidades;  
- `fix:` para correções de bugs;  
- `chore:` para tarefas administrativas ou de build;  
- `docs:` para alterações em documentação;  
- `refactor:` para mudanças no código que não alteram funcionalidades;  
- `test:` para adição ou alteração de testes.

## Justificativa
- Facilita leitura e rastreabilidade do histórico do projeto.  
- Suporta integração com ferramentas de release automático (ex: semantic-release).  
- Ajuda equipes grandes a manter consistência em commits de múltiplos microsserviços.  

## Consequências
- Positivo: histórico de commits padronizado e legível.  
- Positivo: possibilidade de gerar changelogs automáticos.  
- Negativo: exige disciplina da equipe para seguir a convenção.  
- Próximos passos: configurar ferramentas de lint de commit (`commitlint`) e pipelines para validar mensagens.
