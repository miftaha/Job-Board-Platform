import Link from 'next/link'
import { Job } from '@/types'
import Button from '@/components/common/Button'

interface JobListProps {
  jobs: Job[]
  isLoading?: boolean
}

export default function JobList({ jobs, isLoading = false }: JobListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">
        No jobs match your filters.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 truncate">
            {job.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            {job.company} • {job.location}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 capitalize">
            Level: {job.experience_level}
          </p>
          {job.salary && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Salary: {job.salary}
            </p>
          )}
          <Link href={`/jobs/${job.id}`}>
            <Button
              variant="outline"
              className="mt-4 w-full border-primary text-primary hover:bg-blue-50 transition-colors text-xs sm:text-sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
