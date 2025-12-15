const nodemailer = require('nodemailer')
const axios = require('axios')

async function sendEmail(to, subject, text) {
  const host = process.env.EMAIL_HOST
  const port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined
  const secure = String(process.env.EMAIL_SECURE || '').toLowerCase() === 'true'
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  const from = process.env.EMAIL_FROM || user || 'no-reply@novawealth.co.ke'

  // Try SMTP first if credentials exist
  if (host && port && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        connectionTimeout: 8000,
        socketTimeout: 8000,
      })

      await transporter.sendMail({ from, to, subject, text })
      return { provider: 'smtp', success: true }
    } catch (err) {
      // fall through to Resend
    }
  }

  // Fallback to Resend API if available
  if (process.env.RESEND_API_KEY) {
    try {
      const apiKey = process.env.RESEND_API_KEY
      await axios.post('https://api.resend.com/emails', {
        from,
        to,
        subject,
        text,
      }, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      })
      return { provider: 'resend', success: true }
    } catch (err) {
      return { provider: 'resend', success: false, error: err.message }
    }
  }

  return { provider: 'none', success: false, error: 'No mail provider configured' }
}

module.exports = sendEmail

