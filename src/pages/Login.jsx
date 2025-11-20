import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, mfaVerify, mfaSetup, getToken } from '../services/authService'

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
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    const token = getToken()
    if (token) {
      navigate('/client-center')
    }
    try {
      const flag = sessionStorage.getItem('logoutSuccess')
      if (flag) {
        setError('')
        setInfo('You have successfully logged out.')
        sessionStorage.removeItem('logoutSuccess')
      }
    } catch {}
  }, [])

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

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const svc = await import('../services/authService')
      const res = await svc.register({ name, email, password, phoneNumber })
      if (res && res.token) {
        navigate('/client-center')
      } else {
        setStage('setup')
      }
    } catch (err) {
      setError('Sign up failed. Try a different email.')
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
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-5">
      <div className="flex flex-col justify-center md:items-start px-6 md:px-8 py-10 md:col-span-2">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
          <img src="/images/Logo for Nova Wealth - SVG.svg" alt="Nova Wealth" className="h-16 md:h-20" />
            <div className="font-montserrat text-xl font-bold">Client Login</div>
          </div>
        <div className="font-montserrat text-2xl font-bold text-black mb-2">Log in to your account</div>
        <div className="font-opensans text-sm font-bold text-black mb-4"> Don't have an account?  <a href="#" onClick={(e) => { e.preventDefault(); setStage('signup'); }} className="text-blue-600 font-bold">Sign Up</a></div>
        {info && (
          <div className="mb-4 rounded-md bg-green-50 text-green-700 px-4 py-3 text-sm">{info}</div>
        )}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
        )}
        {stage === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <button type="button" className="w-full border rounded-lg py-3 font-semibold flex items-center justify-center gap-2 border-[#D4AF37] text-black hover:bg-[#F8F3E6]" onClick={() => { /* placeholder for future OAuth */ }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6,20.5H42V20H24v8h11.3c-1.6,4.6-6,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20c11,0,20-9,20-20C44,22.7,43.8,21.6,43.6,20.5z"/><path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.3,16.2,18.8,14,24,14c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C16.7,4,10.2,7.6,6.3,14.7z"/><path fill="#4CAF50" d="M24,44c6,0,11.5-2.3,15.6-6.1l-7.2-5.9C30.1,33.9,27.2,35,24,35c-5.3,0-9.7-3.4-11.3-8H6.4l-6.7,5.1C10.2,40.4,16.7,44,24,44z"/><path fill="#1976D2" d="M43.6,20.5H42V20H24v8h11.3c-0.8,2.3-2.3,4.3-4.3,5.7l7.2,5.9C41.5,36.6,44,31,44,24C44,22.7,43.8,21.6,43.6,20.5z"/></svg>
              <span>Continue with Google</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="h-px bg-black/10 flex-1" />
              <span className="text-xs text-gray-500">Or with email and password</span>
              <div className="h-px bg-black/10 flex-1" />
            </div>
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
              <div className="flex gap-4">
                <a href="#" onClick={(e) => { e.preventDefault(); setStage('forgot'); }} className="text-black underline">Forgot password?</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setStage('signup'); }} className="text-black underline">Create account</a>
              </div>
            </div>
          </form>
        )}
        {stage === 'mfa' && (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="font-opensans text-gray-700">Enter the 6-digit code from your authenticator app</div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">One-Time Code</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="123456" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Verifying...' : 'Verify Code'}</button>
          </form>
        )}
        {stage === 'setup' && (
          <div className="space-y-6">
            <div className="font-opensans text-gray-700">Scan the QR code to add Nova Wealth to your authenticator</div>
            {qrCode && <img src={qrCode} alt="MFA QR" className="w-56 h-56" />}
            {secret && (
              <div className="text-sm text-black">Manual code: <span className="font-mono">{secret}</span></div>
            )}
            <div>
              <button className="text-sm text-black underline" onClick={() => setStage('mfa')}>Already scanned? Verify code</button>
            </div>
          </div>
        )}
        {stage === 'forgot' && (
          <ForgotPassword email={email} onBack={() => setStage('login')} />
        )}
        {stage === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Phone Number</label>
              <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="+254..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Choose a password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Creating account...' : 'Sign Up'}</button>
            <div className="text-center text-sm">
              <a href="#" onClick={(e) => { e.preventDefault(); setStage('login'); }} className="text-black underline">Have an account? Sign in</a>
            </div>
          </form>
        )}
        </div>
      </div>
      <div className="relative hidden md:block md:col-span-3">
        <img src="/images/professionals-login-page.jpg" alt="Wealth management" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <div className="font-montserrat text-2xl mb-2">Plan, diversify, and grow your wealth</div>
          <div className="font-opensans text-sm">Personalised advisory across retirement, savings, and global investments.</div>
        </div>
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