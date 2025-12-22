import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register, logout } from '../services/authService'

export default function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [info, setInfo] = useState('')

    function isStrongPassword(p) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(p)
    }

    async function handleRegister(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            if (!name || !email || !password) {
                setLoading(false)
                return setError('All fields are required.')
            }
            if (!isStrongPassword(password)) {
                setLoading(false)
                return setError('Password must be at least 8 characters and include letters, numbers, and a special character.')
            }
            if (password !== confirmPassword) {
                setLoading(false)
                return setError('Passwords do not match.')
            }

            const payload = {
                name: String(name).trim(),
                email: String(email).trim(),
                password
            }

            const res = await register(payload)
            if (res) {
                logout()
                // We set a flag or just navigate to login with a message
                navigate('/login?registered=true')
            }
        } catch (err) {
            console.error("Registration error:", err)
            const msg = err?.response?.data?.message || err?.message || 'Sign up failed. Try a different email.'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignUp = () => {
        const redirect = `${window.location.origin}/oauth/callback`
        const rawBase = import.meta.env.VITE_API_URL || window.location.origin
        const baseUrl = rawBase.replace(/\/+$/, '')
        const url = `${baseUrl}/api/auth/google?redirect=${encodeURIComponent(redirect)}`

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

    return (
        <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-5">
            <div className="flex flex-col justify-center md:items-start px-6 md:px-8 py-10 md:col-span-2">
                <div className="w-full max-w-sm">
                    <div className="font-montserrat text-3xl font-bold mb-2">
                        <span className="text-black">Start Your </span>
                        <span className="text-[#D4AF37]">Wealth Journey</span>
                    </div>
                    <p className="font-opensans text-sm text-gray-600 mb-4">
                        Join the next generation of wealthy families and professionals.
                    </p>
                    <div className="font-montserrat text-base font-bold text-black mb-8">
                        Create Account
                    </div>

                    {error && (
                        <div className="mb-6 rounded-md bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
                    )}

                    <div className="space-y-6">
                        <button type="button" className="w-full border border-black rounded-lg py-3 font-semibold flex items-center justify-center gap-2 text-black hover:bg-black/5" onClick={handleGoogleSignUp}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6,20.5H42V20H24v8h11.3c-1.6,4.6-6,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20c11,0,20-9,20-20C44,22.7,43.8,21.6,43.6,20.5z" /><path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.3,16.2,18.8,14,24,14c3.1,0,6,1.2,8.2,3.1l5.7-5.7C35.6,6.2,30.1,4,24,4C16.7,4,10.2,7.6,6.3,14.7z" /><path fill="#4CAF50" d="M24,44c6,0,11.5-2.3,15.6-6.1l-7.2-5.9C30.1,33.9,27.2,35,24,35c-5.3,0-9.7-3.4-11.3-8H6.4l-6.7,5.1C10.2,40.4,16.7,44,24,44z" /><path fill="#1976D2" d="M43.6,20.5H42V20H24v8h11.3c-0.8,2.3-2.3,4.3-4.3,5.7l7.2,5.9C41.5,36.6,44,31,44,24C44,22.7,43.8,21.6,43.6,20.5z" /></svg>
                            <span>Sign up with Google</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="h-px bg-black/10 flex-1" />
                            <span className="text-xs text-gray-400 font-medium">OR WITH EMAIL</span>
                            <div className="h-px bg-black/10 flex-1" />
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f7f9] text-black focus:bg-white focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f7f9] text-black focus:bg-white focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none"
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
                                <p className="mt-1 text-[11px] text-gray-500 leading-tight">
                                    Must be 8+ characters and include letters, numbers, and a special character.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f4f7f9] text-black focus:bg-white focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none"
                                    placeholder="Re-enter password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D4AF37] text-white font-bold py-4 rounded-lg hover:bg-[#B99A2F] transition-colors disabled:opacity-70 mt-4 text-lg"
                            >
                                {loading ? 'CREATING ACCOUNT...' : 'Sign Up'}
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-sm font-medium text-black hover:underline underline-offset-4">
                                Have an account? <span className="underline">Sign in</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden md:block md:col-span-3">
                <img src="/images/register.png" alt="Start your journey" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <div className="font-montserrat text-2xl mb-2">Invest in your family's future</div>
                    <div className="font-opensans text-sm">Join the next generation of wealthy families and professionals.</div>
                </div>
            </div>
        </div>
    )
}
