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
  const [stage, setStage] = useState('signup')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    } catch {}
  }, [searchParams])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login({ email: String(email).trim(), password: String(password) })
      if (res && res.mfaRequired) {
        setInfo('A verification code has been sent to your email. Enter it below to complete MFA.')
        setStage('mfa')
      } else if (res && res.token && res.isMfaEnabled === false) {
        await mfaSetup()
        setInfo('A verification code has been sent to your email. Enter it below to complete MFA.')
        setStage('mfa')
      } else {
        navigate('/client-center')
      }
    } catch (err) {
      console.error("Login error:", err)
      const msg = err?.response?.data?.message || err?.message || 'Login failed. Check your credentials.'
      setError(msg)
    } finally {
      setLoading(false)
    }
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
        navigate('/client-center')
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

  const handleGoogleSignUp = () => {
    openGooglePopup()
  }

  const openGooglePopup = () => {
    // Construct the redirect URL for the frontend callback
    const redirect = `${window.location.origin}/oauth/callback`
    // Use the API URL from environment variables or fallback to current origin
    const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
    // Redirect to backend Google OAuth endpoint
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
           navigate('/client-center')
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
      <div className="flex flex-col justify-center md:items-start px-6 md:px-8 py-10 md:col-span-2">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="font-montserrat text-xl font-bold">
              {stage === 'signup' ? 'Sign Up' : (stage === 'login' ? 'Client Login' : 'Account Access')}
            </div>
          </div>
        
        {stage === 'login' && (
          <>
            <div className="font-montserrat text-2xl font-bold text-black mb-2">Log in to your account</div>
            <div className="font-opensans text-sm font-bold text-black mb-4"> Don't have an account?  <a href="#" onClick={(e) => { e.preventDefault(); setStage('signup'); }} className="text-blue-600 font-bold">Sign Up</a></div>
          </>
        )}

        {stage === 'signup' && (
          <>
            <div className="font-montserrat text-2xl font-bold text-black mb-2">Create your account</div>
            <div className="font-opensans text-sm font-bold text-black mb-4"> Have an account?  <a href="#" onClick={(e) => { e.preventDefault(); setStage('login'); }} className="text-blue-600 font-bold">Log in</a></div>
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
            <button type="button" className="w-full border rounded-lg py-3 font-semibold flex items-center justify-center gap-2 border-[#D4AF37] text-black hover:bg-[#F8F3E6]" onClick={handleGoogleSignIn}>
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
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Signing in...' : 'Sign In'}</button>
            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-4 w-full justify-between">
                <a href="#" onClick={(e) => { e.preventDefault(); setStage('forgot'); }} className="text-black underline">Forgot password?</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setStage('signup'); }} className="text-black underline">Create account</a>
              </div>
            </div>
          </form>
        )}
        {stage === 'mfa' && (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="font-opensans text-gray-700">Enter the 6-digit code sent to your email</div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">One-Time Code</label>
              <input type="text" inputMode="numeric" pattern="\d{6}" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="123456" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#B99A2F] disabled:opacity-70">{loading ? 'Verifying...' : 'Verify Code'}</button>
          </form>
        )}
        {stage === 'setup' && (
          <div className="space-y-6">
            <div className="font-opensans text-gray-700">We have sent a verification code to your email. Enter it to complete MFA.</div>
            <div>
              <button className="text-sm text-black underline" onClick={() => setStage('mfa')}>Verify code</button>
            </div>
          </div>
        )}
        {stage === 'forgot' && (
          <ForgotPassword email={email} onBack={() => setStage('login')} />
        )}
        {stage === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-6">
            <button type="button" className="w-full border rounded-lg py-3 font-semibold flex items-center justify-center gap-2 border-[#D4AF37] text-black hover:bg-[#F8F3E6]" onClick={handleGoogleSignUp}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6,20.5H42V20H24v8h11.3c-1.6,4.6-6,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20c11,0,20-9,20-20C44,22.7,43.8,21.6,43.6,20.5z"/><path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.3,16.2,18.8,14,24,14c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C16.7,4,10.2,7.6,6.3,14.7z"/><path fill="#4CAF50" d="M24,44c6,0,11.5-2.3,15.6-6.1l-7.2-5.9C30.1,33.9,27.2,35,24,35c-5.3,0-9.7-3.4-11.3-8H6.4l-6.7,5.1C10.2,40.4,16.7,44,24,44z"/><path fill="#1976D2" d="M43.6,20.5H42V20H24v8h11.3c-0.8,2.3-2.3,4.3-4.3,5.7l7.2,5.9C41.5,36.6,44,31,44,24C44,22.7,43.8,21.6,43.6,20.5z"/></svg>
              <span>Sign Up with Google</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="h-px bg-black/10 flex-1" />
              <span className="text-xs text-gray-500">Or with email</span>
              <div className="h-px bg-black/10 flex-1" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Choose a password" />
              <div className="text-xs text-gray-600 mt-1">Must be 8+ characters and include letters, numbers, and a special character.</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Confirm Password</label>
              <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" placeholder="Re-enter password" />
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
