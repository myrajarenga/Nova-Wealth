const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { config } = require('./config')
const authRoutes = require('./routes/authRoutes')
const leadRoutes = require('./routes/leadRoutes')
const mongoose = require('mongoose')

const app = express()

app.use(helmet())
app.use(cors({ origin: true }))
app.use(express.json())
app.use(morgan(config.logFormat))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: config.env })
})

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)

const port = config.port

async function start() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI)
    }
    app.listen(port, () => {
      console.log(`server listening on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('mongo connection error')
    process.exit(1)
  }
}

start()