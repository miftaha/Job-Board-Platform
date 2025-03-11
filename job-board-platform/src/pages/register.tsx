import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Input from '../components/common/Input'
import { register } from '../lib/api'
import { RegisterRequest } from '../types'

const RegisterPage: NextPage = () => {
  const [form, setForm] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await register(form)
      console.log('Register response:', response)
      router.push('/login')
    } catch (err: any) {
      console.error('Register error:', err)
      setError(err.message || 'Registration failed.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Register - Job Board</title>
      </Head>
      <div className="card w-full max-w-md">
        <h1 className="text-center mb-6">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <div className="mb-4">
            <label className="block text-subheading mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as 'user' | 'admin' })
              }
              className="w-full p-3 rounded-lg border border-gray-300 text-neutral"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-body-sm mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
