import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setToken } from '../services/authService'
import api from '../services/api'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [status, setStatus] = useState('Completing sign in...')

  useEffect(() => {
    async function run() {
      const token = params.get('token')
      const mfaRequired = params.get('mfaRequired')
      const email = params.get('email')
      // const redirect = params.get('redirect') || '/client-center'

      const message = {
        type: 'GOOGLE_AUTH_SUCCESS',
        data: mfaRequired === 'true' && email ? { mfaRequired: true, email } : { token }
      }

      // 1. Try BroadcastChannel (works even if opener is lost)
      try {
        const channel = new BroadcastChannel('auth_channel')
        channel.postMessage(message)
        setTimeout(() => channel.close(), 1000)
      } catch (e) {
        // Silent fail in production - error already handled
      }

      // 2. Try window.opener
      if (window.opener) {
        window.opener.postMessage(message, window.location.origin)
      }

      // 3. Cache token if present
      if (token) {
        setToken(token)
        try {
          const { data } = await api.get('/api/auth/me')
          if (data) {
            localStorage.setItem('nw_user', JSON.stringify(data))
          }
        } catch { }
      }

      // 4. Attempt to close
      window.close()

      // 5. Update status for manual action if close fails
      if (mfaRequired === 'true') {
        setStatus('Please check the main window to complete verification. You can close this window.')
      } else {
        setStatus('Authentication successful. You can close this window.')
      }

      // Do NOT auto-navigate to /client-center or /login inside this popup
      // as it causes the user to get stuck in the popup context.
    }
    run()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="font-montserrat text-lg mb-4">{status}</div>
      <button onClick={() => window.close()} className="px-6 py-2 bg-[#D4AF37] text-white font-bold rounded hover:bg-[#B99A2F] transition-colors">
        Close Window
      </button>
    </div>
  )
}