// Tipos TypeScript do projeto
// Aqui definimos o "formato" dos dados que vamos usar

// Configuração de conexão com o Supabase
export type SupabaseConfig = {
  url: string
  key: string
  table: string
}

// Um registro genérico da tabela do usuário
// Record<string, unknown> = objeto com chaves string e valores de qualquer tipo
export type DataRow = Record<string, unknown>

// Insight gerado pela IA
export type Insight = {
  title: string
  description: string
}