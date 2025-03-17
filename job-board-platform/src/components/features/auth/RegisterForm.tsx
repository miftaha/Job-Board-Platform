/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Link from 'next/link'
import { registerUser } from '@/lib/api/auth'
import { useAuth } from '@/context/AuthContext'

export default function RegisterForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'admin',
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await registerUser(formData)
      login(response.access, formData.username)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Input
        type="text"
        name="username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        label="Username"
        required
        className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
      />
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        label="Email"
        required
        className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        label="Password"
        required
        className="w-full p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
      />
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Register As
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value as 'user' | 'admin',
            })
          }
          className="mt-1 block w-full p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <Button
        type="submit"
        variant="primary"
        className="w-full bg-primary hover:bg-blue-700 text-white transition-colors"
      >
        Register
      </Button>
      <p className="text-center text-gray-600 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  )
}
