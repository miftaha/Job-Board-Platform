import Link from 'next/link'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-neutral text-white h-screen fixed">
      <div className="p-4">
        <h2 className="text-heading-lg">Job Board</h2>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block p-4 hover:bg-primary transition-colors"
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className="block p-4 hover:bg-primary transition-colors"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/applications"
              className="block p-4 hover:bg-primary transition-colors"
            >
              My Applications
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
