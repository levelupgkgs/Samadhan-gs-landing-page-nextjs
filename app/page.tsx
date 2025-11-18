
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ReviewsSection from './components/ReviewsSection'
import BlogSection from './components/BlogSection'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section - Deep blue to purple gradient */}
      <section id="home" className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <HeroSection />
      </section>

      {/* Features Section - Purple to pink gradient */}
      <section id="features" className="bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900">
        <FeaturesSection />
      </section>

      {/* Reviews Section - Pink to orange gradient */}
      <section id="reviews" className="bg-gradient-to-br from-fuchsia-900 via-rose-900 to-orange-900">
        <ReviewsSection />
      </section>

      {/* Blog Section - Orange to amber gradient */}
      <section id="blog" className="bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900">
        <BlogSection />
      </section>

      {/* Download Section - Teal to emerald gradient */}
      <section id="download" className="bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900">
        <DownloadSection />
      </section>

      <Footer />
    </main>
  )
}
