# Descrição

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
