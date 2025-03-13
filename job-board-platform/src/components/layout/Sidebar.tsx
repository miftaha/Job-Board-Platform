import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/common/Button'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout()
      router.push('/login')
    }
  }

  const isActive = (path: string) => router.pathname === path

  return (
    <>
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-50 bg-white shadow-md rounded-r-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:sticky md:top-0 md:h-screen md:translate-x-0 transition-transform duration-300 ease-in-out z-40 p-4 sm:p-6 flex flex-col`}
      >
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Job Nexus
          </h2>
          <button className="md:hidden p-2" onClick={() => setIsOpen(false)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 sm:space-y-4">
            <li>
              <Link
                href="/dashboard"
                className={`block p-2 sm:p-3 rounded-md transition-colors text-sm sm:text-base ${
                  isActive('/dashboard')
                    ? 'bg-blue-100 text-primary font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={`block p-2 sm:p-3 rounded-md transition-colors text-sm sm:text-base ${
                  isActive('/jobs')
                    ? 'bg-blue-100 text-primary font-medium'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                All Jobs
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full border-red-500 text-red-500 hover:bg-red-50 transition-colors text-sm sm:text-base"
          >
            Logout
          </Button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
