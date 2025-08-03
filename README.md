# IgmaBoard

Um board de tarefas moderno inspirado em ferramentas como Trello e ClickUp, com foco em engenharia de software, testes e boas práticas. Projeto desenvolvido em React com TypeScript, estilização via Styled-Components e testes automatizados com Jest e Gherkin (jest-cucumber).

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Styled-Components
- Vite
- Jest
- @testing-library/react
- jest-cucumber (Gherkin)
- ESLint + Prettier
- Docker (no backend)
- Node.js + Express (no backend)

## 📁 Estrutura do Projeto
frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── TaskCard.tsx
│ │ └── tests/
│ │ ├── TaskCard.test.tsx
│ │ └── TaskCard.feature
│ ├── styles/
│ │ ├── global.ts
│ │ └── theme.ts
│ ├── types/
│ │ └── global.d.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── setupTests.ts
├── tsconfig.json
├── jest.config.ts
└── README.md

## 🚀 Como Rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-user/igma-board.git
cd igma-board/frontend
npm install
npm run dev
npm run test
```
✅ Funcionalidades atuais
 Task Card reutilizável com título e clique

 Tema global com Styled Components

 Testes unitários com React Testing Library

 Testes BDD com Gherkin (jest-cucumber)

 Tipagens personalizadas (DefaultTheme via styled.d.ts)

 Integração pronta para conectar com backend Express

📌 Convenções e Padrões
Componentes com Styled-Components (sem arquivos .css)

Arquitetura modular

Testes cobrem cada componente (unitários + BDD)

Arquivos de feature em inglês

TS Configs separados para app/node/test

Pastas organizadas com aliases (@components, @styles)

🧱 Backend
O backend é um CRUD em Node.js com Express. Endpoints:

GET /tasks

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

Você pode rodar o backend separadamente para conectar o board à API.