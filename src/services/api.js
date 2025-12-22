import axios from 'axios'

// In development, we use the Vite proxy.
// In production (Cloudflare Pages), Functions are on the same origin, so we use relative path.
const baseURL = import.meta.env.VITE_API_URL || '';

// Removed console.log to prevent exposing API configuration in production

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 60000, // Increased to 60s for cold starts
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('authToken')
    : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
