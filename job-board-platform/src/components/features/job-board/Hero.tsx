import Link from 'next/link'
import Button from '@/components/common/Button'

export default function Hero() {
  return (
    <section className="flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50">
      <div className="max-w-3xl text-center px-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your Dream Job Today
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
          Explore thousands of opportunities tailored to your skills and
          interests.
        </p>
        <Link href="/register">
          <Button
            variant="primary"
            className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-colors"
          >
            Start Exploring
          </Button>
        </Link>
      </div>
    </section>
  )
}
