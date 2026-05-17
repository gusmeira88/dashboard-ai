# Dashboard AI

Dashboard analytics com IA — conecte seu Supabase e visualize seus dados com insights do Llama 3.

## Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar conta no Groq (grátis)
- Acesse: https://console.groq.com
- Crie uma conta gratuita
- Gere uma API key

### 3. Variável de ambiente
Crie um arquivo `.env` na raiz:
```
GROQ_API_KEY=sua_chave_aqui
```

### 4. Rodar local
```bash
npm run dev
```

### 5. Deploy no Vercel
```bash
npm install -g vercel
vercel
```
No painel do Vercel, adicione a variável de ambiente `GROQ_API_KEY`.

## Como usar

1. Abra o site
2. Coloque a URL e Anon Key do seu projeto Supabase
3. Informe o nome da tabela
4. Clique em Conectar
5. Explore os gráficos e clique em "Analisar com IA"

## Tech stack
- React + TypeScript
- Supabase (banco PostgreSQL)
- Recharts (gráficos)
- Groq API / Llama 3 (IA gratuita)
- Vercel Functions (proxy seguro da API key)