import {
  Job,
  Application,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  User,
  TokenRefreshRequest,
  TokenRefreshResponse,
} from '../types'
import { API_BASE_URL } from '../constants'

const getToken = () => localStorage.getItem('access_token')

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`.replace(/\/+$/, '') + '/'
  console.log('Fetching:', url, 'Options:', options)
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        ...options.headers,
      },
      redirect: 'manual',
    })
    console.log('Response status:', response.status)
    if (!response.ok) {
      const error = await response.text()
      console.log('Error response:', error)
      throw new Error(error || `API request failed: ${response.status}`)
    }
    return response.json()
  } catch (error: any) {
    console.error('Fetch error:', error)
    throw new Error(error.message || 'Network request failed')
  }
}

export const login = (data: LoginRequest) =>
  fetchAPI<LoginResponse>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const register = (data: RegisterRequest) =>
  fetchAPI<RegisterResponse>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getCurrentUser = () =>
  fetchAPI<User>('/auth/me/', {
    method: 'GET',
  })

export const refreshToken = (data: TokenRefreshRequest) =>
  fetchAPI<TokenRefreshResponse>('/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getJobs = () => fetchAPI<Job[]>('/jobs/')
export const getJobById = (id: string) => fetchAPI<Job>(`/jobs/${id}/`)
export const getApplications = () => fetchAPI<Application[]>('/applications/')
export const applyForJob = (jobId: string, data: FormData) =>
  fetchAPI<Application>(`/jobs/${jobId}/apply/`, {
    method: 'POST',
    body: data,
    headers: {},
  })
