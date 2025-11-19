const dotenv = require('dotenv')
dotenv.config()
const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  logFormat: process.env.LOG_FORMAT || 'dev'
}
module.exports = { config }