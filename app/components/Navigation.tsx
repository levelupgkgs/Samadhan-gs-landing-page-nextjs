
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home', isSection: true },
  { name: 'Features', href: '#features', isSection: true },
  { name: 'Reviews', href: '#reviews', isSection: true },
  { name: 'Blog', href: '/blog', isSection: false },
  { name: 'Download', href: '#download', isSection: true }
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Only track sections on home page
      if (isHomePage) {
        const sections = navItems.filter(item => item.isSection).map(item => item.href.slice(1))
        const scrollPosition = window.scrollY + 100 // Account for fixed nav

        // Find the current section based on scroll position
        let currentSection = 'home'

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop - 80 // Account for nav height
            if (scrollPosition >= offsetTop) {
              currentSection = section
            }
          }
        }

        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false)

    if (item.isSection) {
      // If on homepage, scroll to section
      if (isHomePage) {
        const element = document.getElementById(item.href.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // If not on homepage, navigate to homepage with hash
        window.location.href = `/${item.href}`
      }
    }
    // For non-section items (like /blog), Link will handle navigation
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Clickable */}
            <Link href="/">
              <motion.div
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">📚</span>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Samadhan GS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = isHomePage && item.isSection && activeSection === item.href.slice(1)

                if (item.isSection) {
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      className={`text-sm font-medium transition-colors relative ${
                        isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.button>
                  )
                }

                return (
                  <Link key={item.name} href={item.href}>
                    <motion.span
                      className={`text-sm font-medium transition-colors relative ${
                        pathname === item.href ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute top-0 right-0 bottom-0 w-64 bg-gray-900 border-l border-white/10 overflow-y-auto">
              <div className="flex flex-col space-y-1 p-6 pt-20">
                {navItems.map((item) => {
                  const isActive = item.isSection
                    ? (isHomePage && activeSection === item.href.slice(1))
                    : pathname === item.href

                  if (item.isSection) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        className={`text-left px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}>
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
