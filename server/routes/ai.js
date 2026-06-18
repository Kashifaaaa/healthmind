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
          content: `You are a caring health assistant having a conversation. 
              Keep responses SHORT (2-3 sentences max). 
              Ask ONE follow-up question at a time to understand the user better. 
              Gather information gradually like a real doctor would. 
              Only give full advice after asking enough questions.
              Always remind users to consult a real doctor for serious concerns.`
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