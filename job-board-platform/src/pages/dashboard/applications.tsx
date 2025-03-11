import Sidebar from '@/components/layout/Sidebar'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { fetchApplications, ApiResponse } from '@/utils/api'
import { Application } from '@/types'

export default function Applications() {
  const { user, token } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token || !user) {
      setError('Please log in to view your applications.')
      setLoading(false)
      return
    }

    const loadApplications = async () => {
      setLoading(true)
      const response: ApiResponse<Application[]> = await fetchApplications()
      if (response.data) {
        setApplications(response.data)
      } else if (response.error) {
        setError(response.error.message || 'Failed to load applications')
      }
      setLoading(false)
    }

    loadApplications()
  }, [token, user])

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <h2 className="text-3xl font-semibold text-primary">
            My Applications
          </h2>
          <p className="mt-4 text-neutralGray">
            You must be logged in to view your applications. Please log in{' '}
            <a href="/login" className="text-secondary hover:underline">
              here
            </a>
            .
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          My Applications
        </h2>
        {loading && <p className="text-neutralGray">Loading applications...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && applications.length === 0 && (
          <p className="text-neutralGray">
            You have not applied to any jobs yet.
          </p>
        )}
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-primary">
                Application #{app.id}
              </h3>
              <p className="mt-2 text-neutralGray">
                Cover Letter: {app.cover_letter}
              </p>
              <p className="mt-1 text-neutralGray">
                Applied At: {new Date(app.applied_at).toLocaleDateString()}
              </p>
              <p className="mt-1 text-neutralGray">Job ID: {app.job}</p>
              {app.resume && (
                <p className="mt-1 text-neutralGray">Resume: {app.resume}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
