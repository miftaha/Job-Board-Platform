import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { fetchJobs } from '@/lib/api/jobs'
import { Job } from '@/types'
import { decodeJWT } from '@/lib/utils'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/layout/Sidebar'
import { useAuth } from '@/context/AuthContext'

interface JobDetailsProps {
  job: Job | null
}

export default function JobDetails({ job }: JobDetailsProps) {
  const router = useRouter()
  const { accessToken, isAuthenticated } = useAuth()
  const [coverLetter, setCoverLetter] = useState('')
  const [resume, setResume] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const decodedToken = accessToken ? decodeJWT(accessToken) : null

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-base sm:text-lg text-gray-600">Job not found.</p>
      </div>
    )
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken) {
      setError('Please log in to apply.')
      router.push('/login')
      return
    }
    if (coverLetter.length < 1) {
      setError('Cover letter is required.')
      return
    }
    if (resume && !resume.name.endsWith('.pdf')) {
      setError('Resume must be a PDF.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData()
    formData.append('Job', job.title)
    if (resume) formData.append('Resume', resume)
    formData.append('Cover letter', coverLetter)

    console.log(
      'Sending request to:',
      `/api/jobs/${job.id}/apply/`,
      'FormData:',
      [...formData.entries()]
    )

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        console.log('Request timed out after 30 seconds')
      }, 70000)

      const response = await fetch(`/api/jobs/${job.id}/apply/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const text = await response.text()
        console.error('Raw response:', text)
        throw new Error(
          `Server error: ${response.status} - ${text.slice(0, 50)}...`
        )
      }

      const data = await response.json()
      console.log('Response data:', data)
      setSuccess('Application submitted successfully!')
      setCoverLetter('')
      setResume(null)
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError(
          'Request timed out after 30 seconds. The server might be slow or down.'
        )
        console.error('Abort error details:', err)
      } else {
        setError(err.message || 'Failed to submit application.')
        console.error('Apply error:', err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && (file.size > 5 * 1024 * 1024 || !file.name.endsWith('.pdf'))) {
      setError('Resume must be a PDF under 5MB.')
      setResume(null)
    } else {
      setResume(file)
      setError(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {job.company} • {job.location}
            </p>
          </header>

          <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
            <dl className="space-y-4 sm:space-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Experience Level
                </dt>
                <dd className="mt-1 text-base text-gray-900 capitalize">
                  {job.experience_level}
                </dd>
              </div>
            </dl>
          </section>

          <section className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
              Apply Now
            </h2>
            {success && (
              <p className="text-green-600 mb-4 text-sm sm:text-base">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>
            )}
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <Input
                  type="text"
                  value={job.title}
                  readOnly
                  className="w-full p-2 sm:p-2.5 border border-gray-200 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Resume (PDF, max 5MB, optional)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="Resume"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="mt-1 block w-full p-2 border border-gray-200 rounded-md text-gray-600 text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <Input
                type="textarea"
                name="cover_letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                label="Cover Letter"
                placeholder="Write your cover letter here..."
                required
                aria-required="true"
                className="w-full p-2 sm:p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full bg-primary hover:bg-blue-700 text-white transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </section>

          <Button
            variant="outline"
            onClick={handleBack}
            className="mt-4 sm:mt-6 w-full sm:w-auto border-primary text-primary hover:bg-blue-50 transition-colors"
            disabled={isSubmitting}
          >
            Back to Dashboard
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<JobDetailsProps> = async (
  context
) => {
  const { id } = context.params!
  try {
    const jobs = await fetchJobs()
    const job = jobs.find((j: Job) => j.id === Number(id)) || null
    return { props: { job } }
  } catch (error) {
    console.error('Error fetching job details:', error)
    return { props: { job: null } }
  }
}
