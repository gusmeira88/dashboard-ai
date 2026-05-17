import { useState, useEffect } from 'react'
import ConnectionSetup from './components/ConnectionSetup'
import Dashboard from './components/Dashboard'
import './dashboard.css'

function App() {

  const [config, setConfig] = useState(null)

  // Verifica se o usuário já conectou antes
  useEffect(() => {

    const url    = localStorage.getItem('sb_url')
    const key    = localStorage.getItem('sb_key')
    const tabela = localStorage.getItem('sb_tabela')

    if (url && key && tabela) {
      setConfig({ url, key, tabela })
    }

  }, [])

  function handleConectar(novaConfig) {
    localStorage.setItem('sb_url',    novaConfig.url)
    localStorage.setItem('sb_key',    novaConfig.key)
    localStorage.setItem('sb_tabela', novaConfig.tabela)

    setConfig(novaConfig)
  }

  function handleDesconectar() {
    localStorage.removeItem('sb_url')
    localStorage.removeItem('sb_key')
    localStorage.removeItem('sb_tabela')

    setConfig(null)
  }

  return (
    <>
      {config === null
        ? <ConnectionSetup onConectar={handleConectar} />
        : <Dashboard config={config} onDesconectar={handleDesconectar} />
      }
    </>
  )
}

export default App