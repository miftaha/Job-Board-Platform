import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import { getJobs, getCurrentUser } from '../lib/api'
import { Job, User } from '../types'

const Dashboard: NextPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    experience_level: '' as '' | 'entry' | 'mid' | 'senior',
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchData = async () => {
      try {
        const [jobsData, userData] = await Promise.all([
          getJobs(),
          getCurrentUser(),
        ])
        setJobs(jobsData)
        setFilteredJobs(jobsData)
        setUser(userData)
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message || 'Failed to load data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [router])

  useEffect(() => {
    setFilteredJobs(
      jobs.filter(
        (job) =>
          (!filters.location || job.location.includes(filters.location)) &&
          (!filters.category || job.category.includes(filters.category)) &&
          (!filters.experience_level ||
            job.experience_level === filters.experience_level)
      )
    )
  }, [filters, jobs])

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>User Dashboard - Job Board</title>
      </Head>
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="mb-6">Available Jobs</h1>
        {user && (
          <p>
            Welcome, {user.username} ({user.role})
          </p>
        )}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Filter by location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            placeholder="Filter by category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <select
            value={filters.experience_level}
            onChange={(e) =>
              setFilters({
                ...filters,
                experience_level: e.target.value as
                  | ''
                  | 'entry'
                  | 'mid'
                  | 'senior',
              })
            }
            className="w-full p-3 rounded-lg border border-gray-300"
          >
            <option value="">All Experience Levels</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="card flex justify-between items-center"
              >
                <div>
                  <h3 className="mb-1">{job.title}</h3>
                  <p className="text-body-sm">
                    {job.company} - {job.location}
                  </p>
                </div>
                <button className="btn-primary">Apply Now</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
