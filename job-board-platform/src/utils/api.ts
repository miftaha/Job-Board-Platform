import {
  LoginCredentials,
  RegisterCredentials,
  TokenRefresh,
  User,
  Job,
  Application,
  ApiResponse,
} from '@/types'

const BASE_URL = 'https://alx-project-nexus-pvjg.onrender.com/api'

export const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('accessToken')
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(JSON.stringify(error.error))
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: JSON.parse(error.message) }
  }
}

export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<{ access: string; refresh: string }>> {
  return fetchWithAuth('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function getUser(): Promise<ApiResponse<User>> {
  return fetchWithAuth('/auth/me/', { method: 'GET' })
}

export async function fetchApplications(): Promise<ApiResponse<Application[]>> {
  return fetchWithAuth('/applications/', { method: 'GET' })
}
