
'use client'
import { motion } from 'framer-motion'

export default function DownloadSection() {
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
            Start Your <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Preparation Today</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Download the Samadhan GS app and begin your journey toward exam success
          </p>
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
            <div className="mb-8">
              <motion.a
                href="https://play.google.com/store"
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-black text-white px-8 py-4 rounded-2xl flex items-center space-x-4 hover:bg-gray-800 transition-colors">
                  <div className="text-3xl">📱</div>
                  <div>
                    <div className="text-sm">Get it on</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </div>
              </motion.a>
            </div>

            <div className="space-y-4">
              {[
                '✅ Completely Free to Download',
                '✅ Works Offline',
                '✅ Regular Content Updates',
                '✅ Expert Support Available'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - QR Code and Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-8"
          >
            {/* QR Code */}
            <div className="glass-effect p-8 rounded-2xl text-center">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
                {/* QR Code placeholder */}
                <div className="grid grid-cols-8 gap-1">
                  {[...Array(64)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white font-medium">Scan to Download</p>
            </div>

            {/* Animated Phone */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-48 h-80 bg-gray-900 rounded-[2rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-[1.5rem] flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
                    animate={{ y: [-100, 300] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="text-center p-6 relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-xl mb-3 mx-auto flex items-center justify-center">
                      <span className="text-xl">📚</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1">Samadhan GS</h3>
                    <p className="text-xs opacity-80">Ready to Download</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
