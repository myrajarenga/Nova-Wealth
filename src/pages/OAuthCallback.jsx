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
      const redirect = params.get('redirect') || '/client-center'
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