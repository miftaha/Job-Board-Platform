export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface RegisterResponse {
  username: string
  email: string
  role: 'user' | 'admin'
}

export interface User {
  id: number | null
  username: string
  email?: string
  role?: 'user' | 'admin'
}

export interface TokenRefreshRequest {
  refresh: string
}

export interface TokenRefreshResponse {
  refresh: string
  access: string
}

export interface Job {
  id: number
  title: string
  company: string
  location: string
  category: string
  experience_level: 'entry' | 'mid' | 'senior'
  description: string
  salary: string
  posted_by: number
}

export interface Application {
  id: number
  job: number
  applicant: number
  resume: string
  cover_letter: string
  status: string
}
