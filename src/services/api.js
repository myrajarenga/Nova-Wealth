import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://nova-wealth-1.onrender.com',
  withCredentials: true,
  timeout: 15000,
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
