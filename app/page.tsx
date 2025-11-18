
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ReviewsSection from './components/ReviewsSection'
import BlogSection from './components/BlogSection'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navigation />

      {/* Hero Section - Deep blue gradient */}
      <section id="home" className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 scroll-mt-16">
        <HeroSection />
      </section>

      {/* Features Section - Subtle purple tint */}
      <section id="features" className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900 scroll-mt-16">
        <FeaturesSection />
      </section>

      {/* Reviews Section - Clean slate background */}
      <section id="reviews" className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 scroll-mt-16">
        <ReviewsSection />
      </section>

      {/* Blog Section - Subtle warm tint */}
      <section id="blog" className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900 scroll-mt-16">
        <BlogSection />
      </section>

      {/* Download Section - Green accent */}
      <section id="download" className="bg-gradient-to-b from-slate-900 via-emerald-950/30 to-slate-900 scroll-mt-16">
        <DownloadSection />
      </section>

      {/* Footer */}
      <footer className="bg-slate-950">
        <Footer />
      </footer>
    </main>
  )
}
