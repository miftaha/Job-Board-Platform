import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, ApiResponse } from '@/types'
import { login, getUser } from '@/utils/api'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  )

  useEffect(() => {
    if (token) {
      getUser().then((response) => {
        if (response.data) setUser(response.data)
      })
    }
  }, [token])

  const handleLogin = async (credentials: {
    username: string
    password: string
  }) => {
    const response = await login({
      username: credentials.username,
      password: credentials.password,
    })
    if (response.data) {
      localStorage.setItem('accessToken', response.data.access)
      setToken(response.data.access)
      const userResponse = await getUser()
      if (userResponse.data) setUser(userResponse.data)
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
