import api from './api'

const TOKEN_KEY = 'authToken'

export function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
}

export function setToken(token) {
  if (typeof window !== 'undefined') {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  }
}

export async function register(payload) {
  const { data } = await api.post('/api/auth/register', payload)
  if (data && data.token) setToken(data.token)
  return data
}

export async function login(payload) {
  const { data } = await api.post('/api/auth/login', payload)
  if (data && data.token) setToken(data.token)
  return data
}

export async function mfaSetup() {
  const { data } = await api.post('/api/auth/mfa/setup')
  return data
}

export async function mfaVerify(payload) {
  const { data } = await api.post('/api/auth/mfa/verify', payload)
  if (data && data.token) setToken(data.token)
  return data
}

export function logout() {
  if (typeof window !== 'undefined') {
    try { sessionStorage.setItem('logoutSuccess', '1') } catch { }
  }
  setToken(null)
}

export async function forgotPassword(payload) {
  const { data } = await api.post('/api/auth/password/forgot', payload)
  return data
}

export async function resetPassword(payload) {
  const { data } = await api.post('/api/auth/password/reset', payload)
  if (data && data.token) setToken(data.token)
  return data
}

export async function me() {
  const { data } = await api.get('/api/auth/me')
  return data
}