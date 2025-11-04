# Descrição

O objetivo deste projeto é facilitar a criação de novas API's seguindo um padrão de arquitetura por Domínio. Na prática, para cada domínio (ex: "filmes"), temos as seguintes camadas:

| Camada         | Função                                               | Exemplo (no domínio 'movies') |
| -------------- | ---------------------------------------------------- | ----------------------------- |
| **Domain**     | Define o modelo de negócio e suas regras.            | `Movie.ts`                    |
| **Repository** | Implementa o acesso ao banco de dados (via Prisma).  | `MovieRepository.ts`          |
| **Service**    | Orquestra a lógica de aplicação e regras de negócio. | `MovieService.ts`             |
| **Controller** | Recebe requisições HTTP e chama a camada de serviço. | `MovieController.ts`          |
| **Routes**     | Mapeia os endpoints da API para os controllers.      | `movie.routes.ts`             |

Essa abordagem, que agrupa os arquivos por funcionalidade, é projetada para ser escalável e manutenível.

#### Estrutura de pastas

```
src/
│
├── app/
│   ├── domains/
│   │   └── movies/
│   │       ├── Movie.ts                # Entidade (POO)
│   │       ├── MovieRepository.ts      # Camada de acesso a dados
│   │       ├── MovieService.ts         # Camada de serviço (lógica de negócio)
│   │       ├── MovieController.ts      # Camada de apresentação (HTTP)
│   │       └── movie.routes.ts         # Definição de rotas
│   │
│   ├── middlewares/
│   │   └── validateBody.ts
│   │
│   ├── validators/
│   │   └── movie.validator.ts
│   │
│   └── config/
│       └── prisma/
│           └── client.ts
│
├── server.ts
├── app.ts
└── prisma/
    └── schema.prisma
```

#### Tecnologias e integrações

| Categoria            | Ferramenta                | Observações                          |
| -------------------- | ------------------------- | ------------------------------------ |
| **Runtime**          | Node.js (LTS)             | Base                                 |
| **Framework**        | Express                   | Estável e minimalista                |
| **ORM**              | Prisma                    | Tipagem forte e produtivo            |
| **Banco**            | PostgreSQL                | Suporte nativo via Docker            |
| **Infra local**      | Docker Compose            | Um container para DB                 |
| **Infra deploy**     | Docker + Docker Compose   | Um container para app, outro para DB |
| **Testes Unitários** | Jest                      | Integração simples com TS            |
| **Testes E2E**       | Supertest + Jest          | Simula chamadas HTTP                 |
| **Documentação**     | Swagger + Scalar          | Swagger tradicional + UI moderna     |
| **Observabilidade**  | Jaeger + OpenTelemetry    | Rastreia requisições end-to-end      |
| **Env Config**       | dotenv + Zod              | Validação de variáveis de ambiente   |
| **Logger**           | Pino                      | Melhor desempenho e JSON output      |
| **Lint & Style**     | ESLint + Prettier + Husky | Código limpo e consistente           |

# Para desenvolvimento

#### 🚀 Requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js 25+
- Docker
- Docker Compose

1. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o conteúdo:

```
# URL de conexão do banco local (container Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_dev?schema=public"
```

2. Subir o banco de dados com Docker

O projeto já contém um `docker-compose.yml` configurado para o PostgreSQL.

Para iniciar o banco em background:

```
npm run docker:up
```

Isso criará e iniciará o container do Postgres.

Os dados serão persistidos automaticamente em um volume Docker chamado postgres_data.

💡 Para parar o banco:

```
npm run docker:down
```

(use docker compose down -v se quiser apagar o volume e os dados).

3. Configurar o Prisma

Após o banco estar rodando:

```
npm run prisma:generate
npm run prisma:migrate
```

Esses comandos:

- Geram o Prisma Client (ORM usado pelo projeto);
- Aplicam as migrations no banco (app_dev).

💡 Você pode abrir o Prisma Studio (interface visual para o banco) com:

```
npm run prisma:studio
```

O Studio abrirá em http://localhost:5555 e exibirá as tabelas do banco no container.

4. Instalar dependências da aplicação

Na raiz do projeto:

```
npm install
```

5. Rodar a API em modo desenvolvimento

Use o comando:

```
npm run dev
```

O servidor iniciará localmente (ex.: http://localhost:3000);

O código é recarregado automaticamente a cada alteração (Hot Reload);

A API se conecta ao banco no container via localhost:5432.
