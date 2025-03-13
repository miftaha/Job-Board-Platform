import { FormEvent } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = () => {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    console.log('Search triggered')
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-sm max-w-md mx-auto">
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search jobs"
          className="w-full pl-9 px-4 py-2 p-sm border border-accent rounded-btn bg-white text-text focus:outline-none focus:ring-1 focus:ring-primary shadow-soft"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white hover:bg-blue-700 px-md transition-colors shadow-soft"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
