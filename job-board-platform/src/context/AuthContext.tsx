import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AuthContextType {
  accessToken: string | null
  username: string | null
  isAuthenticated: boolean
  login: (token: string, username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken')
    }
    return null
  })
  const [username, setUsername] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username')
    }
    return null
  })
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('accessToken')
    }
    return false
  })

  useEffect(() => {
    // Sync localStorage with state on mount
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('username')
    if (token) {
      setAccessToken(token)
      setUsername(user)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (token: string, username: string) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem('username', username)
    setAccessToken(token)
    setUsername(username)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    setAccessToken(null)
    setUsername(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, username, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
