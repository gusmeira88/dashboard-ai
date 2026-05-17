import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import ChartSection from './ChartSection'
import DataTable from './DataTable'
import InsightCard from './InsightCard'

function Dashboard(props) {

  const [linhas,     setLinhas]     = useState([])
  const [insights,   setInsights]   = useState([])
  const [carregando, setCarregando] = useState(true)
  const [analisando, setAnalisando] = useState(false)
  const [erro,       setErro]       = useState('')

  const supabase = createClient(props.config.url, props.config.key)

  useEffect(() => {

    async function buscarDados() {
      setCarregando(true)

      const resposta = await supabase
        .from(props.config.tabela)
        .select('*')
        .limit(100)

      if (resposta.error) {
        setErro('Erro ao buscar dados: ' + resposta.error.message)
      } else {
        setLinhas(resposta.data)
      }

      setCarregando(false)
    }

    buscarDados()

  }, [])

  async function handleAnalisar() {
    setAnalisando(true)
    try {
      const resposta = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linhas })
      })

      if (!resposta.ok) {
        throw new Error(`HTTP ${resposta.status}: ${await resposta.text()}`)
      }

      const resultado = await resposta.json()

      if (resultado.error) {
        alert('Erro na análise: ' + resultado.error)
      } else {
        setInsights(resultado.insights)
      }
    } catch (err) {
      alert('Erro ao conectar com a API: ' + err.message)
    } finally {
      setAnalisando(false)
    }
  }

  if (carregando) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f9' }}>
        <p style={{ color: '#9da3be', fontSize: '14px' }}>Carregando dados...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', background: '#f4f5f9' }}>
        <p style={{ color: '#f04f72' }}>{erro}</p>
        <button onClick={props.onDesconectar}>Voltar</button>
      </div>
    )
  }

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard AI</h1>
          <p>Tabela: <strong>{props.config.tabela}</strong> · {linhas.length} registros</p>
        </div>

        <div className="header-botoes">
          <button onClick={handleAnalisar} disabled={analisando}>
            {analisando ? 'Analisando...' : '✨ Analisar com IA'}
          </button>
          <button onClick={props.onDesconectar}>
            Desconectar
          </button>
        </div>
      </div>

      <div className="dashboard-body">

        {insights.length > 0 && (
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        )}

        <ChartSection linhas={linhas} />
        <DataTable linhas={linhas} />

      </div>

    </div>
  )
}

export default Dashboard