# Dashboard AI

Dashboard analytics com IA — conecte seu banco Supabase e visualize seus dados com insights gerados pelo Llama 3 (Groq).

## Tech Stack

- **React + Vite** — frontend
- **JavaScript (JSX)** — componentes
- **TypeScript** — Vercel Function e tipos
- **Supabase** — banco de dados PostgreSQL
- **Groq API / Llama 3** — geração de insights com IA (gratuito)
- **Vercel Functions** — proxy seguro da API key
- **Vercel** — deploy e hospedagem

## Como usar

1. Acesse o link do projeto
2. Cole a URL e a Publishable Key do seu projeto Supabase
3. Informe o nome da tabela
4. Clique em **Conectar**
5. Explore os gráficos e clique em **✨ Analisar com IA**

Suas credenciais ficam salvas apenas no seu navegador (localStorage). Nenhum dado é enviado para servidores externos.

## Rodando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/dashboard-ai.git
cd dashboard-ai
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie sua conta no Groq (gratuito)

Acesse [console.groq.com](https://console.groq.com), crie uma conta e gere uma API key.

### 4. Configure o .env

Crie um arquivo `.env` na raiz do projeto:

```
GROQ_API_KEY=sua_chave_aqui
```

### 5. Rode com Vercel Dev

> ⚠️ Use `npm run dev:vercel` e não `npm run dev`.
> O Vite sozinho não serve a pasta `api/` — só o `vercel dev` executa as funções serverless localmente.

```bash
npm run dev:vercel
```

Acesse: **http://localhost:3000**

## Deploy na Vercel

1. Suba o projeto no GitHub
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório
3. Antes de fazer deploy, adicione a variável de ambiente:
   - `GROQ_API_KEY` = sua chave do Groq
4. Clique em **Deploy**

A cada `git push` o deploy acontece automaticamente.

## Estrutura do projeto

```
src/
├── App.jsx
├── dashboard.css
└── components/
    ├── ConnectionSetup.jsx   ← tela de conexão
    ├── Dashboard.jsx         ← tela principal
    ├── ChartSection.jsx      ← gráfico automático
    ├── DataTable.jsx         ← tabela de dados
    └── InsightCard.jsx       ← cards de insight da IA

api/
└── analyze.ts               ← Vercel Function → chama Groq
```