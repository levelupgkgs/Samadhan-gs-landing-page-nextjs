'use client'
import { motion } from 'framer-motion'

export default function AnimatedHeader() {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        Latest <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Insights</span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Expert tips, exam updates, and preparation strategies
      </p>
    </motion.div>
  )
}
