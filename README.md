# ENTEC UNINASSAU 2026

Aplicação web para divulgar o evento ENTEC UNINASSAU 2026 e gerenciar inscrições das duplas nos torneios de EA Sports FC 26 e Mortal Kombat 11.

## Funcionalidades

- Página inicial com informações dos torneios e contadores de inscrições.
- Regulamento específico para EA Sports FC 26.
- Regulamento específico para Mortal Kombat 11.
- Cadastro de duplas para cada torneio.
- Listagem de duplas inscritas.
- Edição e exclusão de inscrições.
- Endpoints informativos sobre local, tema e contato do evento.

## Tecnologias

- **Node.js:** execução da aplicação no servidor.
- **Express:** servidor HTTP, middlewares e roteamento.
- **Express Handlebars:** renderização das páginas dinâmicas.
- **Sequelize:** modelagem e acesso ao banco de dados.
- **SQLite:** persistência local das inscrições.
- **HTML5:** estrutura das páginas.
- **CSS3:** layout, animações e design neo-brutalista.
- **JavaScript:** interações no navegador e animações.
- **Tailwind CSS:** utilitários visuais carregados pelo CDN.

## Estrutura

```text
/
├── server.js                 # Inicialização do Express e configuração do Handlebars
├── config/
│   └── database.js           # Conexão Sequelize com SQLite
├── models/
│   └── Inscricao.js          # Modelo das inscrições
├── routes/
│   ├── eafc.js               # CRUD e regras do EA FC 26
│   ├── mk11.js               # CRUD e regras do MK11
│   └── evento.js             # Informações do evento
├── views/
│   ├── layouts/main.handlebars
│   ├── home.handlebars
│   ├── inscricoes.handlebars
│   ├── regras-eafc.handlebars
│   └── regras-mk11.handlebars
└── public/
    ├── assets/
    ├── css/
    └── js/
```

## Pré-requisitos

- Node.js 18 ou superior.
- npm.

## Instalação e execução

```powershell
npm install
npm start
```

Abra `http://localhost:3000` no navegador.

O banco SQLite fica em `database.sqlite` e é criado ou atualizado automaticamente pelo Sequelize na inicialização. Os dados não são apagados quando o servidor reinicia.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Página inicial |
| GET | `/eafc/regras` | Regulamento EA FC 26 |
| GET | `/eafc/inscritos` | Inscrições EA FC 26 |
| POST | `/eafc/inscrever` | Criar inscrição EA FC 26 |
| POST | `/eafc/editar/:id` | Editar inscrição EA FC 26 |
| POST | `/eafc/deletar/:id` | Excluir inscrição EA FC 26 |
| GET | `/mk11/regras` | Regulamento Mortal Kombat 11 |
| GET | `/mk11/inscritos` | Inscrições Mortal Kombat 11 |
| POST | `/mk11/inscrever` | Criar inscrição MK11 |
| POST | `/mk11/editar/:id` | Editar inscrição MK11 |
| POST | `/mk11/deletar/:id` | Excluir inscrição MK11 |
| GET | `/evento/local` | Informações de local e horário |
| GET | `/evento/tema` | Informações sobre a edição e tema |
| GET | `/evento/contato` | Contatos e organização |

## Banco de dados

O modelo `Inscricao` possui os seguintes campos:

- `jogo`: EAFC26 ou MK11.
- `nomeDupla`.
- `jogador1`.
- `jogador2`.
- `contato`.
- `status`: Pendente por padrão.

## Desenvolvimento

Os arquivos estáticos são disponibilizados pelas rotas `/assets`, `/css` e `/js`. O servidor valida campos obrigatórios nas operações de cadastro e edição.
