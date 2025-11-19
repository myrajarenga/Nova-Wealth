import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, mfaVerify, mfaSetup } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stage, setStage] = useState('login')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login({ email, password })
      if (res && res.mfaRequired) {
        setStage('mfa')
      } else {
        navigate('/client-center')
      }
    } catch (err) {
      setError('Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await mfaVerify({ email, token: otp })
      if (res && res.token) {
        navigate('/client-center')
      }
    } catch (err) {
      setError('Invalid code. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSetup() {
    setError('')
    setLoading(true)
    try {
      const res = await mfaSetup()
      if (res) {
        setQrCode(res.qrCode || '')
        setSecret(res.secret || '')
        setStage('setup')
      }
    } catch (err) {
      setError('Unable to start MFA setup.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="font-montserrat text-3xl font-bold text-black text-center">Account Login</h1>
        <p className="font-opensans text-center text-gray-600 mt-2">Access your Client Centre</p>

        {error && (
          <div className="mt-6 rounded-md bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
        )}

        {stage === 'login' && (
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Signing in...' : 'Sign In'}</button>
            <div className="flex items-center justify-between text-sm">
              <button type="button" onClick={handleSetup} className="text-black underline">Set up MFA</button>
              <a href="#" onClick={(e) => { e.preventDefault(); setStage('forgot'); }} className="text-black underline">Forgot password?</a>
            </div>
          </form>
        )}

        {stage === 'mfa' && (
          <form onSubmit={handleVerify} className="mt-8 space-y-6">
            <div className="text-center font-opensans text-gray-700">Enter the 6-digit code from your authenticator app</div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">One-Time Code</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="123456" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Verifying...' : 'Verify Code'}</button>
          </form>
        )}

        {stage === 'setup' && (
          <div className="mt-8 space-y-6">
            <div className="text-center font-opensans text-gray-700">Scan the QR code to add Nova Wealth to your authenticator</div>
            {qrCode && <img src={qrCode} alt="MFA QR" className="mx-auto w-56 h-56" />}
            {secret && (
              <div className="text-center text-sm text-black">Manual code: <span className="font-mono">{secret}</span></div>
            )}
            <div className="text-center">
              <button className="text-sm text-black underline" onClick={() => setStage('mfa')}>Already scanned? Verify code</button>
            </div>
          </div>
        )}

        {stage === 'forgot' && (
          <ForgotPassword email={email} onBack={() => setStage('login')} />
        )}
      </div>
    </div>
  )
}

function ForgotPassword({ email, onBack }) {
  const [mail, setMail] = useState(email || '')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState('request')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function requestCode(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const res = await (await import('../services/authService')).forgotPassword({ email: mail })
      setMsg('If this email exists, a code has been sent.')
      // For development, backend may include devCode
      if (res && res.devCode) setCode(res.devCode)
      setStep('reset')
    } catch {
      setMsg('Unable to request code.')
    } finally {
      setLoading(false)
    }
  }

  async function doReset(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const svc = await import('../services/authService')
      const res = await svc.resetPassword({ email: mail, code, newPassword })
      setMsg('Password updated. You can sign in now.')
    } catch {
      setMsg('Invalid code or error resetting password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="text-center font-montserrat text-xl">Forgot Password</div>
      {msg && <div className="rounded-md bg-blue-50 text-blue-700 px-4 py-3 text-sm">{msg}</div>}
      {step === 'request' && (
        <form onSubmit={requestCode} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Email</label>
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="you@example.com" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Sending...' : 'Send Code'}</button>
            <button type="button" onClick={onBack} className="flex-1 border border-black/10 rounded-lg py-3">Back</button>
          </div>
        </form>
      )}
      {step === 'reset' && (
        <form onSubmit={doReset} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Verification Code</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="6-digit code" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="New password" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Resetting...' : 'Reset Password'}</button>
            <button type="button" onClick={onBack} className="flex-1 border border-black/10 rounded-lg py-3">Back</button>
          </div>
        </form>
      )}
    </div>
  )
}