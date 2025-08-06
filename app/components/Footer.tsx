
'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">SG</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Samadhan GS</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted companion for competitive exam preparation. Helping thousands of aspirants achieve their dreams with quality content and expert guidance.
            </p>
            <p className="text-sm text-gray-400">
              © 2024 Samadhan GS. All rights reserved.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Features', 'Pricing', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Help Center', 'FAQ'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between"
        >
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {[
              { name: 'YouTube', icon: '📺' },
              { name: 'Telegram', icon: '✈️' },
              { name: 'Instagram', icon: '📷' },
              { name: 'Twitter', icon: '🐦' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-2xl hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Made with ❤️ for aspirants across India
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
