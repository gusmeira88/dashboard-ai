import { useState } from 'react'

function ConnectionSetup(props) {

  const [url,    setUrl]    = useState('')
  const [key,    setKey]    = useState('')
  const [tabela, setTabela] = useState('')
  const [erro,   setErro]   = useState('')

  function handleConectar() {
    if (!url || !key || !tabela) {
      setErro('Preencha todos os campos')
      return
    }

    props.onConectar({ url, key, tabela })
  }

  return (
    <div className="setup-container">

      <div className="setup-card">

        <h1>Dashboard AI</h1>
        <p>Conecte seu banco Supabase e visualize seus dados com IA</p>

        <label>URL do Supabase</label>
        <input
          type="text"
          placeholder="https://xxxxx.supabase.co"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label>Anon Key</label>
        <input
          type="password"
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <label>Nome da Tabela</label>
        <input
          type="text"
          placeholder="vendas"
          value={tabela}
          onChange={(e) => setTabela(e.target.value)}
        />

        {erro && <p className="erro">{erro}</p>}

        <button onClick={handleConectar}>
          Conectar
        </button>

        <p className="hint">
          Suas credenciais ficam salvas apenas no seu navegador.
        </p>

      </div>

    </div>
  )
}

export default ConnectionSetup