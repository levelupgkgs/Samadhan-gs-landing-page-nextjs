
'use client'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Complete GS/GK Syllabus Coverage',
    description: 'Comprehensive content covering all major competitive exam syllabi',
    icon: '📚',
    span: 'col-span-1 row-span-2'
  },
  {
    title: 'Bilingual Content',
    description: 'Easy-to-understand language in Hindi & English',
    icon: '🌐',
    span: 'col-span-1'
  },
  {
    title: 'Offline Downloads',
    description: 'Download content and access without internet',
    icon: '💾',
    span: 'col-span-1'
  },
  {
    title: 'Exam-wise Strategy',
    description: 'Tailored preparation strategies for UPSC, SSC, State PSCs',
    icon: '🎯',
    span: 'col-span-2'
  },
  {
    title: 'Analysis & Reports',
    description: 'Detailed exam analysis and performance reports',
    icon: '📊',
    span: 'col-span-1'
  },
  {
    title: 'Regular Updates',
    description: 'Fresh content updated regularly',
    icon: '🔄',
    span: 'col-span-1'
  },
  {
    title: 'Expert-Curated Notes',
    description: 'Quality content prepared by subject matter experts',
    icon: '🧠',
    span: 'col-span-1'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bento-card ${feature.span} group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 flex-grow">
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
