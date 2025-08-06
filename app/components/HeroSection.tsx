
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-100, -200],
              x: Math.random() * 100 - 50
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div 
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Master on GK/GS for Government exam with Expert Resources
            </span>
            <br />
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Get upto 90% direct question of GK/GS in all MCQ based Government exams like SSC, Railway, Police, State PCS (pre), State and Central one day exam. Read and practice the complete syllabus of GK/GS.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="https://play.google.com/store"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download App
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div 
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{ 
              y: [0, -10, 0],
              rotateY: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute top-6 w-16 h-1 bg-white/30 rounded-full"></div>
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Master on GK/GS</h3>
                  <p className="text-sm opacity-80">Complete Exam Prep</p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full px-4">
                  {['GS/GK', 'UPSC', 'SSC', 'Notes'].map((item, i) => (
                    <div key={i} className="bg-white/10 p-3 rounded-lg text-center text-xs">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Center Buttons */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <motion.a
          href="/syllabus"
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse Syllabus
        </motion.a>
        <motion.button
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Exam Analysis
        </motion.button>
      </motion.div>
    </section>
  )
}
