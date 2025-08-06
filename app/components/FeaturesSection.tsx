
'use client'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Complete GS/GK Syllabus',
    description: "From comprehensive GK/GS study materials to smart organization tools, we've packed every feature to accelerate your exam preparation journey.",
    icon: '📚'
  },
  {
    title: 'Bilingual and easy to understand language',
    description: 'Language is kept as simple as possible to ensure concept clarity for both English and Hindi medium students.',
    icon: '🌐'
  },
  {
    title: 'Favorites & Offline Downloads',
    description: 'Download PDFs for offline reading. Study anywhere, anytime without internet connectivity. Perfect for Multiple times revision to get confidence on subject.',
    icon: '💾'
  },
  {
    title: 'Exam-wise Preparation',
    description: 'Prepare exam-wise by analyzing previous years GK/GS questions. This approach helps you target your specific exam and build a strong strategy to score above 90% in upcoming attempts.',
    icon: '🎯'
  },
  {
    title: 'Exam Analysis & Reports',
    description: 'It includes the exam pattern, percentage weightage of the GK/GS subject in previous years, previous year questions, cut-off marks, and job profile.',
    icon: '📊'
  },
  {
    title: 'Regular Content Updates',
    description: 'Stay ahead with weekly content updates, latest exam patterns, and fresh study materials. Never miss important changes in your competitive exam syllabus.',
    icon: '🔄'
  },
  {
    title: 'Expert-Curated Content',
    description: 'All materials are reviewed by subject matter experts and successful candidates.Get the most relevant, up-to- date content that actually helps you crack exams.',
    icon: '🧠'
  },
  {
    title: 'Daily & Weekly Quizzes',
    description: 'Stay exam-ready with daily MCQs and weekly quizzes designed to test and improve your knowledge.',
    icon: '✍️'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Samadhan GS</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to excel in competitive exams, all in one app
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
