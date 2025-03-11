import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getJobs } from '../lib/api'
import { Job } from '../types'

const LandingPage: NextPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs()
        setJobs(data.slice(0, 3)) // Show only 3 featured jobs
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Job Board - Find Your Dream Job</title>
        <meta name="description" content="Interactive Job Board Platform" />
      </Head>

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="mb-4">Find Your Dream Job</h1>
          <p className="text-body mb-6">
            Search thousands of job listings tailored for you.
          </p>
          <div className="flex justify-center gap-4 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search jobs by keyword..."
              className="w-full p-3 rounded-lg text-neutral"
            />
            <button className="btn-primary">Search</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-6 text-center">Explore Job Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Technology', 'Marketing', 'Finance'].map((category) => (
              <div key={category} className="card">
                <h3 className="mb-2">{category}</h3>
                <p className="text-body-sm">Explore opportunities</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-6 text-center">Featured Jobs</h2>
          {loading ? (
            <p className="text-center">Loading jobs...</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <button className="btn-primary">Get Started</button>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-body-sm">© 2025 Job Board. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
