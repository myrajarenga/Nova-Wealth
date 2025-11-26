import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setToken } from '../services/authService'
import api from '../services/api'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    async function run() {
      const token = params.get('token')
      const mfaRequired = params.get('mfaRequired')
      const email = params.get('email')
      const redirect = params.get('redirect') || '/client-center'

      // Check if we are in a popup
      if (window.opener) {
        if (mfaRequired === 'true' && email) {
           window.opener.postMessage({
             type: 'GOOGLE_AUTH_SUCCESS',
             data: { mfaRequired: true, email }
           }, window.location.origin)
        } else if (token) {
           setToken(token) // Set in local storage of popup (might not share with opener depending on browser)
           // Actually, opener needs the token.
           window.opener.postMessage({
             type: 'GOOGLE_AUTH_SUCCESS',
             data: { token }
           }, window.location.origin)
        }
        window.close()
        return
      }

      // Fallback for non-popup flow
      if (mfaRequired === 'true' && email) {
        navigate(`/login?mfaRequired=true&email=${encodeURIComponent(email)}`, { replace: true })
        return
      }

      if (token) {
        setToken(token)
        try {
          const { data } = await api.get('/api/auth/me')
          if (data) {
            localStorage.setItem('nw_user', JSON.stringify(data))
          }
        } catch {}
        navigate(redirect, { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-montserrat text-lg">Completing sign in…</div>
    </div>
  )
}