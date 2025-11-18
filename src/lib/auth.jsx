import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const raw = localStorage.getItem('nw_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])
  function login() { const u = { id: 'demo', name: 'Client' }; setUser(u); localStorage.setItem('nw_user', JSON.stringify(u)) }
  function logout() { setUser(null); localStorage.removeItem('nw_user') }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }