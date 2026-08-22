'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';
import { ScreenshotGallery } from './AppScreenshots';

/**
 * Fixed so the markup is stable between renders, and so the drifting specks
 * can be driven by CSS keyframes on the compositor rather than by twenty
 * independent JS animation loops on the main thread.
 */
const PARTICLES = [
  { left: 8, top: 72, duration: 4.2, delay: 0 },
  { left: 21, top: 34, duration: 3.4, delay: 1.1 },
  { left: 33, top: 88, duration: 5.0, delay: 0.4 },
  { left: 44, top: 18, duration: 3.8, delay: 1.8 },
  { left: 57, top: 63, duration: 4.6, delay: 0.9 },
  { left: 69, top: 29, duration: 3.2, delay: 1.4 },
  { left: 78, top: 81, duration: 4.9, delay: 0.2 },
  { left: 88, top: 47, duration: 3.6, delay: 1.6 },
  { left: 15, top: 55, duration: 4.4, delay: 2.1 },
  { left: 63, top: 92, duration: 3.9, delay: 0.7 },
]

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16">
      {/* Background Animation */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

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
            className="flex flex-col gap-4 items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.gs.samadhan"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download App
            </motion.a>

            {/* Secondary Action Buttons */}
            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="/syllabus"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Syllabus
              </motion.a>
              <motion.a
                href="/blog"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Exam Analysis
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* App screenshots */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ScreenshotGallery autoPlay={3500} priority />
        </motion.div>
      </div>


    </section>
  )
}