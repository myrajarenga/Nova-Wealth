import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login, mfaVerify, mfaSetup, getToken, logout } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stage, setStage] = useState('login') // Fixed to login
  const [info, setInfo] = useState('')

  useEffect(() => {
    const token = getToken()
    if (token) {
      navigate('/client-center')
    }

    // Check for MFA requirements from OAuth redirect
    const mfaRequired = searchParams.get('mfaRequired')
    const emailParam = searchParams.get('email')
    if (mfaRequired === 'true' && emailParam) {
      setEmail(emailParam)
      setStage('mfa')
      setInfo('Please verify your identity to complete Google sign in.')
    }

    try {
      const flag = sessionStorage.getItem('logoutSuccess')
      if (flag) {
        setError('')
        setInfo('You have successfully logged out.')
        sessionStorage.removeItem('logoutSuccess')
      }
    } catch { }
  }, [searchParams])

  const handleSmartRouting = (data) => {
    navigate('/client-center')
  }

  async function performLogin(credentials) {
    setError('')
    setLoading(true)
    try {
      const res = await login(credentials)
      if (res && res.mfaRequired) {
        setInfo('A verification code has been sent to your email. Enter it below to complete MFA.')
        setStage('mfa')
      } else if (res && res.token && res.isMfaEnabled === false) {
        await mfaSetup()
        setInfo('A verification code has been sent to your email. Enter it below to complete MFA.')
        setStage('mfa')
      } else {
        handleSmartRouting(res)
      }
    } catch (err) {
      console.error("Login error:", err)
      const msg = err?.response?.data?.message || err?.message || 'Login failed. Check your credentials.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    await performLogin({ email: String(email).trim(), password: String(password) })
  }

  const handleResetSuccess = ({ email: resetEmail, password: resetPassword, response }) => {
    setEmail(resetEmail)
    setPassword(resetPassword)
    setStage('login')
    setInfo('Password updated successfully. Signing you in...')

    // Automatically trigger login or redirect after a short delay
    setTimeout(() => {
      if (response && response.token) {
        // If we already have a token (some backends return it on reset)
        handleSmartRouting(response)
      } else {
        // Otherwise perform login with the new credentials
        performLogin({ email: resetEmail, password: resetPassword })
      }
    }, 1500)
  }

  function isStrongPassword(p) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(p)
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (!email || !password) {
        setLoading(false)
        return setError('Email and password are required.')
      }
      if (!isStrongPassword(password)) {
        setLoading(false)
        return setError('Password must be at least 8 characters and include letters, numbers, and a special character.')
      }
      if (password !== confirmPassword) {
        setLoading(false)
        return setError('Passwords do not match.')
      }
      const svc = await import('../services/authService')
      const payload = { name: String(name).trim(), email: String(email).trim(), password }
      const res = await svc.register(payload)
      if (res) {
        logout()
        setInfo('Account created. Please sign in to set up MFA.')
        setStage('login')
      }
    } catch (err) {
      console.error("Registration error:", err)
      const msg = err?.response?.data?.message || err?.message || 'Sign up failed. Try a different email.'
      setError(msg)
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
        handleSmartRouting(res)
      }
    } catch (err) {
      console.error("MFA Verify Error:", err);
      const msg = err?.response?.data?.message || err?.message || 'Invalid code. Try again.';
      setError(msg)
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
        setInfo('A verification code has been sent to your email.')
        setStage('mfa')
      }
    } catch (err) {
      setError('Unable to start MFA setup.')
    } finally {
      setLoading(false)
    }
  }

  // --- GOOGLE OAUTH HANDLERS ---
  const handleGoogleSignIn = () => {
    openGooglePopup()
  }

  const openGooglePopup = () => {
    const redirect = `${window.location.origin}/oauth/callback`
    const rawBase = import.meta.env.VITE_API_URL || window.location.origin
    const baseUrl = rawBase.replace(/\/+$/, '')
    const url = `${baseUrl}/api/auth/google?redirect=${encodeURIComponent(redirect)}`

    // Open popup
    const width = 500
    const height = 600
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2
    window.open(
      url,
      'google_oauth',
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no`
    )
  }

  useEffect(() => {
    const handleAuthData = (data) => {
      const { token, mfaRequired, email } = data

      if (mfaRequired && email) {
        setEmail(email)
        setStage('mfa')
        setInfo('Please verify your identity to complete Google sign in.')
      } else if (token) {
        // Token is already set in localStorage by the popup before sending message?
        // Actually, better to pass token back and set it here to be sure,
        // OR let popup set it. Let's let popup pass it and we set it here to be safe/reactive.
        // But authService.getToken() reads from localStorage.
        // So let's have the popup pass the token, we set it via setToken (which saves to LS)
        // then we navigate.
        import('../services/authService').then(({ setToken }) => {
          setToken(token)
          handleSmartRouting(data)
        })
      }
    }

    const handleMessage = (event) => {
      // Verify origin if needed, but for now we accept messages
      // from our own domain (which the popup will be on when it redirects back)
      if (event.origin !== window.location.origin) return

      const { type, data } = event.data
      if (type === 'GOOGLE_AUTH_SUCCESS') {
        handleAuthData(data)
      }
    }

    window.addEventListener('message', handleMessage)

    // BroadcastChannel for more robust cross-window communication
    const channel = new BroadcastChannel('auth_channel')
    channel.onmessage = (event) => {
      const { type, data } = event.data
      if (type === 'GOOGLE_AUTH_SUCCESS') {
        handleAuthData(data)
      }
    }

    return () => {
      window.removeEventListener('message', handleMessage)
      channel.close()
    }
  }, [navigate])


  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-5">
      <div className="flex flex-col md:items-start px-6 md:px-8 py-12 md:py-20 md:col-span-2">
        <div className="w-full max-w-sm">


          {stage === 'login' && (
            <>
              <div className="font-montserrat text-3xl font-bold mb-2">
                <span className="text-black">Welcome to </span>
                <span className="text-[#D4AF37]">Nova Wealth</span>
              </div>
              <p className="font-opensans text-sm text-gray-600 mb-4">
                Securely Access Your Dashboard
              </p>
              <div className="font-montserrat text-base font-bold text-black mb-8">
                Login
              </div>
            </>
          )}

          {info && (
            <div className="mb-4 rounded-md bg-green-50 text-green-700 px-4 py-3 text-sm">{info}</div>
          )}
          {error && (
            <div className="mb-6 rounded-md bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
          )}
          {stage === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <button type="button" className="w-full border rounded-lg py-3 font-semibold flex items-center justify-center gap-2 border-black text-black hover:bg-[#F8F3E6]" onClick={handleGoogleSignIn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6,20.5H42V20H24v8h11.3c-1.6,4.6-6,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20c11,0,20-9,20-20C44,22.7,43.8,21.6,43.6,20.5z" /><path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.3,16.2,18.8,14,24,14c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C16.7,4,10.2,7.6,6.3,14.7z" /><path fill="#4CAF50" d="M24,44c6,0,11.5-2.3,15.6-6.1l-7.2-5.9C30.1,33.9,27.2,35,24,35c-5.3,0-9.7-3.4-11.3-8H6.4l-6.7,5.1C10.2,40.4,16.7,44,24,44z" /><path fill="#1976D2" d="M43.6,20.5H42V20H24v8h11.3c-0.8,2.3-2.3,4.3-4.3,5.7l7.2,5.9C41.5,36.6,44,31,44,24C44,22.7,43.8,21.6,43.6,20.5z" /></svg>
                <span>Continue with Google</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-px bg-black/10 flex-1" />
                <span className="text-xs text-gray-400 font-medium tracking-wider">OR WITH EMAIL</span>
                <div className="h-px bg-black/10 flex-1" />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f7f9] text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="myrajarenga1234@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f7f9] text-black focus:bg-white focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none"
                  placeholder="..........."
                />
                <div className="mt-2 text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security: One-Time Token has been sent to your email.
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] text-white font-bold py-4 rounded-lg hover:bg-[#B99A2F] transition-colors disabled:opacity-70 mt-4 text-lg"
              >
                {loading ? 'AUTHENTICATING...' : 'Sign In'}
              </button>
              <div className="flex justify-between items-center text-sm font-medium">
                <a href="#" onClick={(e) => { e.preventDefault(); setStage('forgot'); }} className="text-black hover:underline">Forgot password?</a>
                <a href="/register" className="text-black hover:underline">Create account</a>
              </div>
            </form>
          )}
          {stage === 'mfa' && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="font-montserrat text-2xl font-bold text-black mb-2">Verify Identity</div>
              <div className="font-opensans text-sm text-gray-600 mb-6 font-medium">Enter the 6-digit code sent to your email.</div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Verification Code</label>
                <input type="text" inputMode="numeric" pattern="\d{6}" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-6 py-4 rounded-xl border-transparent bg-gray-100 text-black text-center text-3xl font-bold tracking-[0.5em] focus:bg-white focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none" placeholder="000000" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg hover:bg-[#B99A2F] transition-colors disabled:opacity-70">
                {loading ? 'VERIFYING...' : 'COMPLETE SIGN IN'}
              </button>
              <button type="button" onClick={() => setStage('login')} className="w-full text-sm font-bold text-gray-400 hover:text-black transition-colors">Back to Login</button>
            </form>
          )}

          {stage === 'forgot' && (
            <ForgotPassword
              email={email}
              onBack={() => setStage('login')}
              onResetSuccess={handleResetSuccess}
            />
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

function ForgotPassword({ email, onBack, onResetSuccess }) {
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
      // Inform parent of success so it can handle auto-login
      if (onResetSuccess) {
        onResetSuccess({ email: mail, password: newPassword, response: res })
      } else {
        setMsg('Password updated. You can sign in now.')
        setLoading(false)
      }
    } catch {
      setMsg('Invalid code or error resetting password.')
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
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="you@example.com" />
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
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="6-digit code" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="New password" />
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
