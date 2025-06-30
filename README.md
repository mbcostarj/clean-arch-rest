# Clean Architecture REST API + Frontend (React)

Este projeto é composto por uma **API REST** desenvolvida com **Node.js + TypeScript**, seguindo os princípios da **Clean Architecture**, e uma aplicação **Frontend em React**, ambos organizados em um único repositório.


---

## 🚀 Tecnologias

### Backend

* Node.js + TypeScript
* Express.js
* Prisma (ORM)
* MongoDB (Database)
* Redis (Token Store)
* JWT (Autenticação)
* Bcrypt (Hash de senha)
* Jest + Supertest (Testes unitários e E2E)


---

## ✅ Funcionalidades da API

* Cadastro de usuários
* Login com JWT
* Listagem de usuários autenticados
* Token salvo no Redis
* Testes E2E com Jest + Supertest
* Organização por camadas (UseCases, Repositories, Presenters, etc.)


---

## 🛇 Arquitetura

O backend segue os princípios da **Clean Architecture**:

* `domain/`: entidades e interfaces do domínio
* `use-cases/`: regras de negócio e fluxos
* `infrastructure/`: implementações (DB, API, JWT, Redis, etc.)
* `presenter/`: transformação da saída
* `main.ts`: composição e execução da aplicação


---

## ✉️ Contato

Dúvidas, feedbacks ou colaborações:

* GitHub: [@mbcostarj](https://github.com/mbcostarj)
* Email: [mbcosta.rj@gmail.com](mailto:mbcosta.rj@gmail.com)
* LinkedIn: [/in/mrcosta/](https://www.linkedin.com/in/mrcosta/)

