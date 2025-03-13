import {
  RegisterData,
  LoginData,
  RegisterResponse,
  AuthResponse,
} from '@/types'

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  console.log('Register Payload:', JSON.stringify(data))
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseData = await res.json()
    if (!res.ok) {
      console.error('Registration API Response:', {
        status: res.status,
        statusText: res.statusText,
        data: responseData,
      })
      throw new Error(
        responseData.error?.message ||
          `Registration failed with status ${res.status}`
      )
    }
    console.log('Registration API Success:', responseData)
    return responseData
  } catch (err) {
    console.error('Registration Error:', err)
    throw err
  }
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  console.log('Login Payload:', JSON.stringify(data))
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseData = await res.json()
    if (!res.ok) {
      console.error('Login API Response:', {
        status: res.status,
        statusText: res.statusText,
        data: responseData,
      })
      throw new Error(
        responseData.error?.message || `Login failed with status ${res.status}`
      )
    }
    console.log('Login API Success:', responseData)
    return responseData
  } catch (err) {
    console.error('Login Error:', err)
    throw err
  }
}
