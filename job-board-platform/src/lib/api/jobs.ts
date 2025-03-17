import { API_BASE_URL } from '@/constants/api'
import { Job } from '@/types'

export const fetchJobs = async (): Promise<Job[]> => {
  const url = `${API_BASE_URL}/jobs` // Absolute URL
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }
  return response.json()
}
