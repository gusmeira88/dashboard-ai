import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function ChartSection(props) {

  if (props.linhas.length === 0) return null

  const colunas = Object.keys(props.linhas[0])
 
  const colunasNumericas = colunas.filter((col) => {
    return typeof props.linhas[0][col] === 'number'
  })
 
  const colunasTexto = colunas.filter((col) => {
    return typeof props.linhas[0][col] === 'string'
  })

  if (colunasNumericas.length === 0) {
    return <p>Nenhuma coluna numérica encontrada para o gráfico.</p>
  }

  const eixoX = colunasTexto[0] || colunas[0]
  const eixoY = colunasNumericas[0]

  const dadosGrafico = props.linhas.slice(0, 20)

  return (
    <div className="card">

      <h2>{eixoY} por {eixoX}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dadosGrafico}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey={eixoX} tick={{ fill: '#666', fontSize: 12 }} />
          <YAxis tick={{ fill: '#666', fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey={eixoY} fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default ChartSection