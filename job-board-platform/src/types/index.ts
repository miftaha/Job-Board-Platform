export interface RegisterData {
  username: string
  email: string
  password: string
  role: 'user' | 'admin' // Add role
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterResponse {
  access: string
  username: string
}

export interface AuthResponse {
  access: string
}

export interface Job {
  id: number
  title: string
  company: string
  location: string
  experience_level: string
  category?: string
  description?: string
  salary?: string
  posted_by?: number
}
