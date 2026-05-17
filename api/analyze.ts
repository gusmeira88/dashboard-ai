import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {

  try {

    const { linhas } = req.body

    const amostra = linhas.slice(0, 20)
    const colunas = Object.keys(amostra[0])

    const prompt = `
      Você é um analista de dados. Analise os dados abaixo e gere 3 insights úteis.

      Colunas: ${colunas.join(', ')}
      Dados: ${JSON.stringify(amostra)}

      Responda APENAS com JSON nesse formato:
      {
        "insights": [
          { "title": "Título curto", "description": "Descrição do insight" },
          { "title": "Título curto", "description": "Descrição do insight" },
          { "title": "Título curto", "description": "Descrição do insight" }
        ]
      }
    `

    const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // ← modelo atualizado
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const dados = await resposta.json()

    // Se a API retornou erro, loga e responde com erro legível
    if (dados.error) {
      console.error('Erro Groq:', dados.error)
      return res.status(500).json({ error: dados.error.message })
    }

    const texto = dados.choices[0].message.content
    const textoLimpo = texto.replace(/```json|```/g, '').trim()
    const resultado = JSON.parse(textoLimpo)

    res.status(200).json(resultado)

  } catch (erro) {
    console.error('Erro geral:', erro)
    res.status(500).json({ error: 'Erro ao analisar os dados' })
  }
}