import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@/components/common/Button'

export default function Header() {
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'
  const isRegisterPage = router.pathname === '/register'

  return (
    <header className="p-4 sm:p-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
          Job Nexus
        </Link>
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          {!isLoginPage && (
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Button>
            </Link>
          )}
          {!isRegisterPage && (
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full bg-primary hover:bg-blue-700 text-white transition-colors"
              >
                Get Started
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
