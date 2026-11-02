# Podcast Manager API

API REST para consultar episódios de podcasts em vídeo. Ela lista todos os episódios cadastrados ou filtra pelo nome do podcast.

O projeto foi desenvolvido durante um curso de criação de APIs com Node.js. Foi feito em TypeScript e sem frameworks: usa apenas o módulo nativo `http` e organiza o código em camadas.

## Funcionalidades

- Listar todos os episódios
- Filtrar episódios pelo nome do podcast
- Responder `204 No Content` quando não há resultados

## Tecnologias

- [Node.js](https://nodejs.org/), com os módulos nativos `http` e `fs`
- [TypeScript](https://www.typescriptlang.org/)
- [tsx](https://tsx.is/), para executar o TypeScript em desenvolvimento
- [tsup](https://tsup.egoist.dev/), para gerar o build
- Arquivo JSON como fonte de dados

## Como executar

**Pré-requisito:** Node.js 22.18+ ou 24.11+, versões exigidas pelo tsup. O projeto foi testado na v24.14.0.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com a porta da API:

   ```env
   PORT=3333
   ```

3. Inicie o servidor:

   ```bash
   npm run start:dev
   ```

A API estará disponível em `http://localhost:3333`.

## Endpoints

| Método | Rota                 | Descrição                                |
| ------ | -------------------- | ---------------------------------------- |
| `GET`  | `/api/list`          | Lista todos os episódios                 |
| `GET`  | `/api/podcasts?p=`   | Filtra os episódios pelo nome do podcast |

### Listar episódios

```bash
curl "http://localhost:3333/api/list"
```

Retorna `200 OK` com um array de todos os episódios, ou `204 No Content` se não houver nenhum cadastrado.

### Filtrar por podcast

```bash
curl "http://localhost:3333/api/podcasts?p=flow"
```

Resposta `200 OK`:

```json
[
  {
    "podcastName": "flow",
    "episode": "CBUM - Flow #319",
    "videoId": "pQSuQmUfS30",
    "category": ["saude", "fitness"]
  },
  {
    "podcastName": "flow",
    "episode": "Felipão - Flow #651",
    "videoId": "DBc68IpXt5U",
    "category": ["politica", "mentalidade"]
  }
]
```

| Requisição                  | Resposta                             |
| --------------------------- | ------------------------------------ |
| `/api/podcasts?p=flow`      | `200 OK` com os episódios do podcast |
| `/api/podcasts?p=outro`     | `204 No Content`, sem corpo          |
| `/api/podcasts`             | `200 OK` com todos os episódios      |

## Modelo de dados

Cada episódio tem os campos abaixo, definidos em [podcast-model.ts](src/models/podcast-model.ts):

| Campo         | Tipo       | Descrição                 |
| ------------- | ---------- | ------------------------- |
| `podcastName` | `string`   | Nome do podcast           |
| `episode`     | `string`   | Título do episódio        |
| `videoId`     | `string`   | Identificador do vídeo    |
| `category`    | `string[]` | Categorias do episódio    |

Os dados de exemplo ficam em [podcasts.json](src/repositories/podcasts.json). Como a API só tem rotas de leitura, novos episódios são adicionados editando esse arquivo.

## Arquitetura

Cada requisição passa pelas camadas abaixo, cada uma com uma única responsabilidade:

```text
Cliente HTTP
     │
     ▼
server.ts        Cria o servidor e escuta na porta definida em PORT
     │
     ▼
app.ts           Compara o método e a URL e escolhe o controller
     │
     ▼
controllers/     Escreve o status, os cabeçalhos e o corpo da resposta
     │
     ▼
services/        Lê o parâmetro de filtro e decide entre 200 e 204
     │
     ▼
repositories/    Lê o podcasts.json e filtra pelo nome do podcast
```

## Estrutura de pastas

```text
14-api-podcast/
├── docs/
│   └── app.md                        # Planejamento inicial do app
├── src/
│   ├── controllers/
│   │   └── podcast-controller.ts     # Monta as respostas HTTP
│   ├── models/
│   │   ├── podcast-model.ts          # Formato de um episódio
│   │   └── podcast-transfer-model.ts # Status e corpo trocados entre camadas
│   ├── repositories/
│   │   ├── podcasts-repository.ts    # Acesso aos dados
│   │   └── podcasts.json             # Dados de exemplo
│   ├── routes/
│   │   └── routes.ts                 # Caminhos das rotas
│   ├── services/
│   │   ├── filter-episodes-service.ts
│   │   └── list-episodes-service.ts
│   ├── utils/                        # Enums de content type, métodos e status HTTP
│   ├── app.ts                        # Roteamento das requisições
│   └── server.ts                     # Ponto de entrada
├── package.json
└── tsconfig.json
```

## Scripts

| Comando               | Descrição                                                 |
| --------------------- | --------------------------------------------------------- |
| `npm run start:dev`   | Inicia a API carregando o `.env`                          |
| `npm run start:watch` | Inicia a API e reinicia ao salvar um arquivo              |
| `npm run dist`        | Gera o build em `dist/`                                   |
| `npm run start:dist`  | Não funciona no momento (veja a seção a seguir)           |

## Limitações conhecidas

Por ser um projeto de estudo, algumas situações ainda não são tratadas:

- **Rotas não previstas ficam sem resposta:** não há retorno `404`. Em URLs desconhecidas, outros métodos (como `POST`) ou barra no final (`/api/list/`), o cliente fica esperando até atingir o próprio tempo limite.
- **O build não executa:** `npm run dist` conclui, mas o comando de `npm run start:dist` é inválido. Ao rodar o build diretamente com `node`, o servidor inicia e encerra na primeira requisição com erro `ENOENT`, pois não encontra o `podcasts.json`. Por enquanto, use `npm run start:dev`.
- **O filtro é exato:** ele diferencia maiúsculas de minúsculas (`?p=FLOW` retorna `204`) e `p` precisa ser o único parâmetro (`?p=flow&x=1` também retorna `204`).
- **Parte do planejamento não foi implementada:** o [docs/app.md](docs/app.md) prevê a separação dos episódios por categoria e os campos `thumbnail` e `link`. Hoje a listagem não é agrupada e esses campos não existem.
- **Não há testes automatizados:** `npm test` apenas exibe uma mensagem de erro.
