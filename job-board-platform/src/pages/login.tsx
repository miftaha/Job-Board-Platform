import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Input from '../components/common/Input'
import { login } from '../lib/api'
import { LoginRequest } from '../types'

const LoginPage: NextPage = () => {
  const [form, setForm] = useState<LoginRequest>({ username: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login(form)
      console.log('Login response:', response)
      localStorage.setItem('access_token', response.access)
      localStorage.setItem('refresh_token', response.refresh)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Login - Job Board</title>
      </Head>
      <div className="card w-full max-w-md">
        <h1 className="text-center mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        <p className="text-body-sm mt-4 text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
