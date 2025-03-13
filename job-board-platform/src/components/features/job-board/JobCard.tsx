import { BriefcaseIcon } from '@heroicons/react/24/outline'

interface JobCardProps {
  title: string
  company: string
  location: string
  experience_level: 'entry' | 'mid' | 'senior'
}

const JobCard = ({
  title,
  company,
  location,
  experience_level,
}: JobCardProps) => {
  return (
    <div className="p-md bg-white rounded-card shadow-soft hover:shadow-hover hover:-translate-y-px transition-all">
      <div className="flex items-center mb-sm">
        <BriefcaseIcon className="h-4 w-4 text-primary mr-sm" />
        <h3 className="text-body font-semibold text-text">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-sm">
        {company} • {location}
      </p>
      <span className="inline-block px-sm py-xs bg-accent text-sm text-gray-700 rounded-full capitalize">
        {experience_level}
      </span>
      <button className="mt-md bg-secondary text-white hover:bg-green-700 w-full text-sm">
        Apply
      </button>
    </div>
  )
}

export default JobCard
