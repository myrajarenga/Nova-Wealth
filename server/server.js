const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { config } = require('./config')
const authRoutes = require('./routes/authRoutes')
const leadRoutes = require('./routes/leadRoutes')
const mongoose = require('mongoose')
let MongoMemoryServer
try {
  const memPkg = require('mongodb-memory-server')
  MongoMemoryServer = memPkg.MongoMemoryServer || memPkg.default
} catch {}

const app = express()

app.use(helmet())
app.use(cors({
  origin: [
    "https://nova-wealth-sigma.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}))

app.use(express.json())
app.use(morgan(config.logFormat))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: config.env })
})
app.get('/', (req, res) => {
  res.send('Nova Wealth API is running.')
})

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)

const port = config.port

async function start() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI)
    } else if (MongoMemoryServer) {
      console.warn('Skipping mongodb-memory-server fallback; continuing without DB')
    } else {
      console.warn('No MONGO_URI provided and mongodb-memory-server not installed; API calls needing DB will fail.')
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
