function DataTable(props) {

  if (props.linhas.length === 0) {
    return <p>Nenhum dado encontrado.</p>
  }

  const colunas = Object.keys(props.linhas[0])

  return (
    <div className="card">

      <h2>Dados da tabela</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {colunas.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {props.linhas.map((linha, index) => (
              <tr key={index}>
                {colunas.map((col) => (
                  <td key={col}>{String(linha[col] ?? '-')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DataTable