import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Building2, Target, BookOpen, Globe, Download, BarChart2, RefreshCw, Brain, PenLine, Mail, MapPin } from 'lucide-react'

export const metadata = {
  title: 'About Us | Samadhan GS',
  description: 'Learn about Samadhan GS — a product of Shivam Trading — and how we help aspirants crack competitive exams.',
}

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Complete GS/GK Syllabus',
    description: 'Comprehensive GK/GS study materials covering every topic you need to ace your competitive exam.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Bilingual Content',
    description: 'Simple language in both English and Hindi to ensure concept clarity for all students.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Favorites & Offline Downloads',
    description: 'Download PDFs for offline reading and study anywhere, anytime without internet connectivity.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Exam-wise Preparation',
    description: 'Target your specific exam by analysing previous years GK/GS questions and building a winning strategy.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Exam Analysis & Reports',
    description: 'Detailed exam pattern analysis, percentage weightage, previous year questions, cut-off marks, and job profiles.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Regular Content Updates',
    description: 'Weekly content updates, latest exam patterns, and fresh study materials so you never fall behind.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Expert-Curated Content',
    description: 'All materials reviewed by subject matter experts and successful candidates for maximum relevance.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    icon: <PenLine className="w-6 h-6" />,
    title: 'Daily & Weekly Quizzes',
    description: 'Stay exam-ready with daily MCQs and weekly quizzes designed to sharpen your knowledge continuously.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Empowering millions of aspirants across India to crack competitive exams with smart, structured, and accessible study material.
            </p>
          </div>

          {/* Brand Identity */}
          <section className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">SG</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Samadhan GS</h2>
                <p className="text-blue-300 text-sm font-medium mb-4">A product of Shivam Trading</p>
                <p className="text-gray-300 leading-relaxed">
                  Samadhan GS is India's trusted companion for competitive exam preparation. Built and operated by <strong className="text-white">Shivam Trading</strong>, our platform brings together expert-curated content, smart tools, and an intuitive mobile experience to help government job aspirants prepare efficiently for UPSC, SSC, State PSC, Railways, Banking, and other competitive exams.
                </p>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is simple — <span className="text-white font-semibold">Read. Understand. Crack Exams.</span> We believe quality exam preparation should be accessible to every aspirant in India, regardless of their background or location. Through bilingual content, offline access, and a constantly updated knowledge base, we make sure no aspirant is left behind.
            </p>
          </section>

          {/* Features */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">What the App Offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.bg} mb-4`}>
                    <span className={feature.color}>{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who We Are */}
          <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Behind the App</h2>
            <p className="text-gray-300 leading-relaxed">
              Samadhan GS is developed and maintained by <strong className="text-white">Shivam Trading</strong>, a company dedicated to building educational technology products that make a real difference in students' lives. Our team of educators, developers, and subject-matter experts work continuously to keep the content fresh, accurate, and exam-relevant.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-400" />
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-6">
              Have questions, feedback, or partnership enquiries? We'd love to hear from you.
            </p>
            <div className="bg-white/10 rounded-xl p-5 space-y-3">
              <p className="text-white font-semibold text-lg">Samadhan GS — Shivam Trading</p>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:samadhangsexam@gmail.com" className="text-blue-400 hover:underline">
                  samadhangsexam@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>India</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  )
}
