const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const aiRoutes = require('./routes/ai')
app.use('/api/ai', aiRoutes)

const sleepRoutes = require('./routes/sleep')
app.use('/api/sleep', sleepRoutes)

const moodRoutes = require('./routes/mood')
app.use('/api/mood', moodRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: 'healthmind' })
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('Connection Error:', err.message))

app.get('/', (req, res) => {
  res.send('HealthMind Backend is running!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})