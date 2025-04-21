# Mony

Mony é uma aplicação web para gerenciamento financeiro pessoal. Os usuários podem registrar e acompanhar assinaturas, definir categorias personalizadas e visualizar seus gastos de forma simples e organizada.

## Índice

- [Funcionalidades](#funcionalidades)
- [Estrutura](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Licença](#licença)

## Funcionalidades

- Autenticação com JWT
- Cadastro de assinaturas com categorias vinculadas ao usuário
- Visualização e gerenciamento de despesas
- Interface responsiva e modular

## Estrutura do Projeto

```
mony/
├── server/                       # Aplicação Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/mony/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── mapper/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── security/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
├── client/                       # Aplicação Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   ├── layout/
│   │   │   └── shared/
│   │   └── assets/
│   └── angular.json
```

- **Frontend:** Aplicação Angular moderna com Tailwind CSS, Angular Router e gráficos interativos via `ng2-charts` (Chart.js).
- **Backend:** API REST em Spring Boot, utilizando autenticação via JWT. O usuário autenticado é recuperado diretamente via `Principal`, aproveitando o contexto de segurança do Spring Security.
- **Banco de Dados:** PostgreSQL com Spring Data JPA para persistência e acesso eficiente aos dados.
- **Comunicação:** O frontend consome a API REST autenticada via tokens JWT.
- **Ambiente de Desenvolvimento:** `ng serve` com reload automático para frontend; Spring Boot Devtools no backend.

## Requisitos

- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- [Angular CLI](https://angular.io/cli) (Compatível com Angular 19)
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Opcional)

## Instalação

### Backend

```bash
cd server
```

- Criar o arquivo `.env` e seguir como base o `.env.example`:

```
POSTGRES_DB=DB_NAME
POSTGRES_USER=USER_NAME
POSTGRES_PASSWORD=PASSWORD
JWT_SECRET=YOUR_JWT_SECRET_HERE
SPRING_ALLOWED_ORIGIN=http://localhost:4200
IP_CONFIG=localhost/WSL_IP
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Acesse em `http://localhost:4200`.

### Docker (Opcional)

```bash
docker-compose up --build
```

## Licença

Distribuído sob a licença MIT.
