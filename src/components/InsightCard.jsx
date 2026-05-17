function InsightCard(props) {
  return (
    <div className="insight-card">
      <p className="insight-titulo">{props.insight.title}</p>
      <p className="insight-descricao">{props.insight.description}</p>
    </div>
  )
}

export default InsightCard