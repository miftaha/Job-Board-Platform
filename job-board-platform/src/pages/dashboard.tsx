/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import JobList from '@/components/features/job-board/JobList'
import SearchBar from '@/components/features/job-board/SearchBar'
import { fetchJobs } from '@/lib/api/jobs'
import { Job } from '@/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '@/components/common/Button'
import { useAuth } from '@/context/AuthContext'

export async function getServerSideProps() {
  try {
    const jobs = await fetchJobs()
    return { props: { jobs: jobs || [] } }
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return { props: { jobs: [] } }
  }
}

interface DashboardProps {
  jobs: Job[]
}

export default function Dashboard({ jobs: initialJobs }: DashboardProps) {
  const router = useRouter()
  const { isAuthenticated, username } = useAuth()
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    experience_level: '',
    salary: '',
    location: '',
    search: '',
  })

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
    const timer = setTimeout(() => setIsLoading(false), 1000)
    const filteredJobs = initialJobs.filter((job) => {
      const matchesSearch = filters.search
        ? job.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company?.toLowerCase().includes(filters.search.toLowerCase())
        : true
      return (
        matchesSearch &&
        (!filters.category ||
          job.category
            ?.toLowerCase()
            .includes(filters.category.toLowerCase())) &&
        (!filters.experience_level ||
          job.experience_level === filters.experience_level) &&
        (!filters.salary ||
          (job.salary &&
            parseFloat(job.salary) >= parseFloat(filters.salary))) &&
        (!filters.location ||
          job.location?.toLowerCase().includes(filters.location.toLowerCase()))
      )
    })
    setJobs(filteredJobs)
    return () => clearTimeout(timer)
  }, [isAuthenticated, filters, initialJobs, router])

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      category: '',
      experience_level: '',
      salary: '',
      location: '',
      search: '',
    })
  }

  if (!isAuthenticated) return null

  const categories = Array.from(
    new Set(initialJobs.map((job) => job.category || ''))
  ).sort()
  const experienceLevels = ['entry', 'mid', 'senior']
  const locations = Array.from(
    new Set(initialJobs.map((job) => job.location || ''))
  ).sort()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="max-w-full sm:max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome, {username || 'User'}!
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Discover your next career opportunity.
                </p>
              </div>
            </header>

            <SearchBar
              search={filters.search}
              onSearchChange={handleFilterChange}
            />

            <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-6 sm:mb-8 mt-6 sm:mt-8">
              <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
                Filter Jobs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat || 'Uncategorized'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="experience_level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience
                  </label>
                  <select
                    id="experience_level"
                    name="experience_level"
                    value={filters.experience_level}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Min Salary
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    type="number"
                    value={filters.salary}
                    onChange={handleFilterChange}
                    placeholder="e.g., 10000"
                    className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="e.g., Addis"
                    className="mt-1 block w-full p-2 sm:p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="mt-4 w-full sm:w-auto border-primary text-primary hover:bg-blue-50 transition-colors"
              >
                Clear Filters
              </Button>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
                Available Opportunities
              </h2>
              <JobList jobs={jobs} isLoading={isLoading} />
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
