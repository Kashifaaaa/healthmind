const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

router.post('/symptom-checker', async (req, res) => {
  try {
    const { symptoms } = req.body

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [{
    role: 'user',
    content: `You are a helpful health assistant. A user has these symptoms: ${symptoms}. Give a brief helpful analysis with possible causes and when to see a doctor. Always remind them you are not a substitute for professional medical advice.`
  }]
})
res.json({ result: completion.choices[0].message.content })

  } catch (error) {
    console.log('AI Error:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content: `You are a health assistant chatbot. 
              STRICT RULES:
              1. Maximum 2 sentences per response
              2. Always end with exactly ONE question
              3. Never give full advice until you ask at least 3 questions
              4. Be conversational and friendly
              5. Always recommend seeing a doctor for serious issues`
                      },
        ...messages
      ]
    })

    res.json({ reply: completion.choices[0].message.content })

  } catch (error) {
    console.log('Chat error:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router