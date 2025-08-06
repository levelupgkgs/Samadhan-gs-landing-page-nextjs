
'use client'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Complete GS/GK Syllabus Coverage',
    description: 'Comprehensive content covering all major competitive exam syllabi',
    icon: '📚'
  },
  {
    title: 'Bilingual Content',
    description: 'Easy-to-understand language in Hindi & English',
    icon: '🌐'
  },
  {
    title: 'Offline Downloads',
    description: 'Download content and access without internet',
    icon: '💾'
  },
  {
    title: 'Exam-wise Strategy',
    description: 'Tailored preparation strategies for UPSC, SSC, State PSCs',
    icon: '🎯'
  },
  {
    title: 'Analysis & Reports',
    description: 'Detailed exam analysis and performance reports',
    icon: '📊'
  },
  {
    title: 'Regular Updates',
    description: 'Fresh content updated regularly',
    icon: '🔄'
  },
  {
    title: 'Expert-Curated Notes',
    description: 'Quality content prepared by subject matter experts',
    icon: '🧠'
  },
  {
    title: 'Mock Tests',
    description: 'Practice with comprehensive mock test series',
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
