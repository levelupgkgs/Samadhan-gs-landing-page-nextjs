'use client'

import { motion } from 'framer-motion'
import { Download, Star, Users, BookOpen, Shield, Smartphone, CheckCircle } from 'lucide-react'

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.gs.samadhan'

const features = [
  {
    icon: <CheckCircle className="w-5 h-5" />,
    text: 'Completely Free to Download',
    color: 'text-green-400'
  },
  {
    icon: <Download className="w-5 h-5" />,
    text: 'Works Offline',
    color: 'text-blue-400'
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    text: 'Regular Content Updates',
    color: 'text-purple-400'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: 'Expert Support Available',
    color: 'text-orange-400'
  }
]

const stats = [
  { value: '50K+', label: 'Downloads', icon: <Download className="w-5 h-5" /> },
  { value: '4.5', label: 'Rating', icon: <Star className="w-5 h-5" /> },
  { value: '10K+', label: 'Active Users', icon: <Users className="w-5 h-5" /> },
  { value: '1000+', label: 'Study Materials', icon: <BookOpen className="w-5 h-5" /> }
]

export default function DownloadSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg shadow-green-500/30"
          >
            <Smartphone className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Start Your <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Preparation Today</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Download the Samadhan GS app and begin your journey toward exam success
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 hover:border-green-500/30 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-xl mb-3 text-green-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Download buttons and features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Main CTA */}
            <div className="mb-8">
              <motion.a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-5 rounded-2xl flex items-center space-x-4 hover:shadow-2xl hover:shadow-green-500/30 transition-all">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm opacity-90">Get it on</div>
                    <div className="text-xl font-bold">Google Play</div>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className={feature.color}>{feature.icon}</span>
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <motion.div
              className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/10">
                Verified App
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/10">
                Safe & Secure
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/10">
                Made in India
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Phone mockup with enhanced design */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Animated Phone */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[3rem] blur-2xl opacity-30"></div>

              {/* Phone frame */}
              <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl border border-gray-700">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-[2.5rem] flex flex-col items-center justify-between text-white relative overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-4 w-20 h-6 bg-black rounded-full"></div>

                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"
                    animate={{ y: [-200, 500] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Content */}
                  <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                    <motion.div
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-4 flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <span className="text-4xl">📚</span>
                    </motion.div>
                    <h3 className="font-bold text-xl mb-2">Samadhan GS</h3>
                    <p className="text-sm opacity-90 mb-4">Master GK/GS for Exams</p>

                    {/* Mini features */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {['GS/GK', 'Quizzes', 'Notes', 'Current Affairs'].map((item, i) => (
                        <motion.div
                          key={i}
                          className="bg-white/10 backdrop-blur-sm p-2 rounded-lg text-center text-xs"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="w-full p-4">
                    <div className="w-32 h-1 bg-white/30 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Download reminder */}
            <motion.p
              className="mt-6 text-gray-400 text-sm text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              Available on Android devices
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
