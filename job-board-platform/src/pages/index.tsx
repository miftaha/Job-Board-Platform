import Header from '@/components/layout/Header'
import Hero from '@/components/features/job-board/Hero'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
