import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { verifyAdmin } from '../api'

interface AuthContextType {
  isAuthenticated: boolean
  username: string | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  login: () => {},
  logout: () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('km_token')
    if (token) {
      verifyAdmin()
        .then(data => { setIsAuthenticated(true); setUsername(data.username) })
        .catch(() => { localStorage.removeItem('km_token') })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('km_token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('km_token')
    setIsAuthenticated(false)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
