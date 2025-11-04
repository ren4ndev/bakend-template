# PRD: Template de Backend (Node.js)

## 1. Visão Geral e Objetivos

O objetivo deste projeto é criar um template de backend robusto, escalável e pronto para produção usando Node.js, Express e Prisma. O template deve seguir as melhores práticas de desenvolvimento, incluindo uma arquitetura clara (baseada em Domínios, Serviços e Repositórios), testes, documentação e observabilidade.

Este documento descreve os requisitos para evoluir o template de um CRUD de exemplo para uma base de aplicação completa e confiável.

## 2. Funcionalidades Atuais

O projeto atualmente fornece uma API REST com as seguintes funcionalidades:

*   **CRUD de Filmes**: Operações completas de Criar, Ler, Atualizar e Deletar para a entidade `Movie`.
*   **Estrutura de Projeto**: Arquitetura pré-definida com separação de responsabilidades.
*   **Setup de Desenvolvimento**: Ambiente de desenvolvimento local com Docker, hot-reload e scripts para gerenciamento do banco de dados.
*   **Validação Básica**: Estrutura inicial para validação de schemas de request com Zod.

## 3. Roadmap de Evolução

Os próximos passos visam adicionar as camadas de robustez e manutenibilidade necessárias para um ambiente de produção.

### 3.1. Validação de Schema das Requisições

*   **Requisito**: Garantir que todas as requisições `POST` e `PUT` sejam validadas para prevenir dados malformados ou maliciosos. A validação deve incluir tipos de dados, campos obrigatórios e regras de negócio simples.
*   **Tecnologia Proposta**: [Zod](https://zod.dev/)
*   **Critérios de Aceite**:
    *   O middleware `validateBody` é aplicado a todas as rotas de criação e atualização.
    *   Os schemas de validação (ex: `createMovieSchema`) cobrem todos os campos esperados no `body` da requisição.
    *   Requisições com corpo inválido retornam um erro `400 Bad Request` com uma mensagem clara, indicando quais campos são inválidos.
    *   A validação de variáveis de ambiente com Zod também é implementada para garantir que a aplicação não inicie sem as configurações necessárias.

### 3.2. Tratamento de Erros Aprimorado

*   **Requisito**: Centralizar o tratamento de erros para evitar `try/catch` repetitivos nos controllers e services, e para fornecer respostas de erro consistentes e seguras (sem vazar detalhes de implementação).
*   **Tecnologia Proposta**: Middleware de erro customizado no Express.
*   **Critérios de Aceite**:
    *   Um middleware de erro é criado e configurado como o último middleware no `app.ts`.
    *   Classes de erro customizadas (ex: `NotFoundError`, `ValidationError`, `AppError`) são criadas para representar diferentes cenários de erro da aplicação.
    *   Os services e repositories lançam esses erros customizados.
    *   O middleware de erro captura os erros, loga os detalhes (ver seção de Logger) e envia uma resposta HTTP com o status code e mensagem apropriados.
    *   Erros inesperados (não capturados) resultam em um erro `500 Internal Server Error` genérico para o cliente, mas são logados com detalhes completos.

### 3.3. Logger Robusto

*   **Requisito**: Implementar um sistema de log estruturado (JSON) para registrar eventos importantes da aplicação, erros e informações de debug.
*   **Tecnologia Proposta**: [Pino](https://getpino.io/)
*   **Critérios de Aceite**:
    *   Uma instância do Pino é configurada e centralizada para ser usada em toda a aplicação.
    *   Logs são escritos em formato JSON para `stdout`.
    *   O middleware de erro (3.2) utiliza o logger para registrar todos os erros capturados, incluindo o stack trace.
    *   Um middleware de log de requisição é adicionado para registrar todas as requisições recebidas (método, URL, status da resposta, tempo de resposta).
    *   Níveis de log (`info`, `warn`, `error`, `debug`) são usados apropriadamente.

### 3.4. Testes Unitários e End-to-End (E2E)

*   **Requisito**: Criar uma suíte de testes automatizados para garantir a qualidade do código, prevenir regressões e facilitar refatorações.
*   **Tecnologia Proposta**: [Jest](https://jestjs.io/) para testes unitários e [Supertest](https://github.com/visionmedia/supertest) para testes E2E.
*   **Critérios de Aceite**:
    *   **Testes Unitários**:
        *   Pelo menos um service (ex: `MovieService`) tem seus métodos cobertos por testes unitários.
        *   Os testes utilizam mocks para dependências externas, como o `MovieRepository`.
        *   Atingem uma cobertura de código mínima de 80% para os arquivos testados.
    *   **Testes E2E**:
        *   Pelo menos um fluxo completo de CRUD (`POST`, `GET`, `PUT`, `DELETE`) é testado para o endpoint de filmes.
        *   Os testes E2E rodam contra um banco de dados de teste separado para garantir o isolamento.
        *   Scripts no `package.json` permitem rodar os testes de forma fácil (`npm test`).

### 3.5. Documentação de Rotas (API)

*   **Requisito**: Documentar todos os endpoints da API de forma clara para que outros desenvolvedores (ou o frontend) possam consumi-la facilmente.
*   **Tecnologia Proposta**: [Swagger](https://swagger.io/) com [Scalar](https://github.com/scalar/scalar) para uma UI moderna.
*   **Critérios de Aceite**:
    *   Um arquivo de especificação OpenAPI (Swagger), em JSON ou YAML, é gerado (automaticamente ou manualmente).
    *   A documentação inclui:
        *   Todos os endpoints disponíveis, com seus métodos HTTP e paths.
        *   Parâmetros de path, query e body.
        *   Schemas de request e response para cada endpoint.
        *   Possíveis codes de status de resposta (200, 201, 400, 404, 500).
    *   A aplicação serve a UI do Swagger (ex: em `/api-docs`) e a UI do Scalar (ex: em `/api-docs-v2`).

### 3.6. Observabilidade

*   **Requisito**: Adicionar rastreamento distribuído (distributed tracing) para monitorar o fluxo de requisições através dos diferentes componentes da aplicação (controller, service, repository).
*   **Tecnologia Proposta**: [OpenTelemetry](https://opentelemetry.io/) com [Jaeger](https://www.jaegertracing.io/) para visualização.
*   **Critérios de Aceite**:
    *   O SDK do OpenTelemetry é configurado no início da aplicação.
    *   A instrumentação automática para Express e Prisma é configurada para criar spans para requisições HTTP e queries ao banco.
    *   Spans customizados são adicionados manually nos services para medir a duração de lógicas de negócio específicas.
    *   Os traces são exportados para um coletor do Jaeger, que pode ser executado localmente via Docker.
    *   É possível visualizar o ciclo de vida completo de uma requisição no Jaeger, desde a chegada no Express até a query no banco de dados.
