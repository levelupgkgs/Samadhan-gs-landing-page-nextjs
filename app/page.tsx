
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ReviewsSection from './components/ReviewsSection'
import BlogSection from './components/BlogSection'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="reviews">
        <ReviewsSection />
      </section>
      <section id="blog">
        <BlogSection />
      </section>
      <section id="download">
        <DownloadSection />
      </section>
      <Footer />
    </main>
  )
}
