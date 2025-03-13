export const fetchJobs = async () => {
  const baseUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
  console.log('Fetching jobs from:', `${baseUrl}/api/jobs`)
  try {
    const res = await fetch(`${baseUrl}/api/jobs`)
    console.log('Jobs fetch status:', res.status, res.statusText)
    if (!res.ok)
      throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`)
    const data = await res.json()
    console.log('Jobs data:', data)
    return data
  } catch (error) {
    console.error('Fetch jobs error:', error)
    throw error
  }
}
