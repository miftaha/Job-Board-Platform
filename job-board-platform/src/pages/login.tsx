import Header from '@/components/layout/Header'
import LoginForm from '@/components/features/auth/LoginForm'
import Footer from '@/components/layout/Footer'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Welcome Back
          </h1>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
